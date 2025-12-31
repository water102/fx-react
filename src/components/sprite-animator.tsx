import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";

type SourceConfig = {
  readonly src: string;        // sprite sheet image source
  readonly width: number;      // width of a single frame
  readonly height: number;     // height of a single frame
  readonly totalFrames: number;
  readonly cols: number;       // number of columns in the sprite sheet
  readonly rows: number;       // number of rows in the sprite sheet
};

type AnimationConfig = {
  readonly name: string;
  readonly frames?: readonly number[];             // explicit frame list
  readonly range?: readonly [number, number];      // range of frames
  readonly duration: number;                       // duration in ms
  readonly delay?: number;                         // delay in ms
  readonly iterationCount?: number | "infinite";   // loop count
  readonly timingFunction?: string;                // CSS timing function
  readonly direction?: "normal" | "reverse" | "alternate" | "alternate-reverse";
  readonly next?: string;                          // animation to play after this one
};

type AnimationTrigger = "manual" | "hover" | "click";

interface SpriteAnimatorProps {
  readonly id: string;
  readonly source: SourceConfig;
  readonly animations: readonly AnimationConfig[];
  readonly play?: string;
  readonly className?: string;
  readonly trigger?: AnimationTrigger;
  readonly flipX?: boolean;
  readonly flipY?: boolean;
  readonly scale?: number;
  readonly debug?: boolean;
  readonly onEnd?: (animName: string) => void;
  readonly onError?: (error: Error) => void;
}

const spriteAnimatorDisplayName = 'SpriteAnimator';

export const SpriteAnimator: React.FC<SpriteAnimatorProps> = React.memo(({
  id,
  source,
  animations,
  play,
  className = "",
  trigger = "manual",
  flipX = false,
  flipY = false,
  scale = 1,
  debug = false,
  onEnd,
  onError,
}) => {
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [current, setCurrent] = useState<string | undefined>(play);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Validate sprite source configuration
  const isValidSource = useMemo(() => {
    return source &&
      source.src &&
      source.width > 0 &&
      source.height > 0 &&
      source.totalFrames > 0 &&
      source.cols > 0 &&
      source.rows > 0;
  }, [source]);

  // Preload sprite image with error handling
  useEffect(() => {
    if (!isValidSource) return;

    const img = new Image();
    const handleLoad = () => setImageLoaded(true);
    const handleError = () => {
      const error = new Error(`Failed to load sprite image: ${source.src}`);
      if (onError) {
        onError(error);
      } else if (debug) {
        console.error(error.message);
      }
      setImageLoaded(false);
    };

    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);
    img.src = source.src;

    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [source.src, isValidSource, onError, debug]);

  // Update current animation when play prop changes
  useEffect(() => {
    setCurrent(play);
  }, [play]);

  // Generate frame list from frames or range
  const getFrames = useCallback((anim: AnimationConfig): readonly number[] => {
    if (anim.frames?.length) return anim.frames;
    if (anim.range) {
      const [start, end] = anim.range;
      const step = start <= end ? 1 : -1;
      const result: number[] = [];
      for (let f = start; step > 0 ? f <= end : f >= end; f += step) {
        result.push(f);
      }
      return result;
    }
    // Default: all frames
    return Array.from({ length: source.totalFrames }, (_, i) => i + 1);
  }, [source.totalFrames]);

  // Returns numeric x,y so we can compute deltas reliably
  const getFrameXY = useCallback((frame: number) => {
    const index = frame - 1;
    const col = index % source.cols;
    const row = Math.floor(index / source.cols);
    const x = -(col * source.width);
    const y = -(row * source.height);
    return { x, y, col, row };
  }, [source.cols, source.width, source.height]);

  const cssText = useMemo(() => {
    if (!isValidSource || !animations?.length || !imageLoaded) return "";

    let css = ``;

    animations.forEach((anim) => {
      if (!anim.name || anim.duration <= 0) return;

      const frameList = getFrames(anim);
      if (frameList.length <= 1) return; // nothing to animate

      // Build XY list for analysis
      const xy = frameList.map(f => getFrameXY(f));

      // Detect single-row linear sequence with constant dx and dy=0
      // Example: x: 0, -64, -128, -192 ... (dx = -64), y = const
      let isSingleRowLinear = true;
      const dy0 = xy[1].y - xy[0].y;
      const dx0 = xy[1].x - xy[0].x;

      if (dy0 !== 0 || dx0 === 0) {
        isSingleRowLinear = false;
      } else {
        for (let i = 1; i < xy.length; i++) {
          const dx = xy[i].x - xy[i - 1].x;
          const dy = xy[i].y - xy[i - 1].y;
          if (dx !== dx0 || dy !== 0) {
            isSingleRowLinear = false;
            break;
          }
        }
      }

      if (isSingleRowLinear) {
        // Use steps(n) with an extra step distance at "to"
        // from: first frame pos
        // to:   first pos + dx * frameCount  -> e.g. 0 -> -256px for 4 frames of 64px
        const n = frameList.length;
        const x0 = xy[0].x;
        const y0 = xy[0].y;
        const toX = x0 + dx0 * n; // NOTE: n, not (n-1)
        css += `
          @keyframes ${id}-${anim.name} {
            from { background-position: ${x0}px ${y0}px; }
            to   { background-position: ${toX}px ${y0}px; }
          }
  
          .sprite-${id}-${anim.name} {
            width: ${source.width}px;
            height: ${source.height}px;
            background-image: url(${source.src});
            background-repeat: no-repeat;
  
            animation: ${id}-${anim.name} ${anim.duration}ms ${anim.timingFunction ?? `steps(${n})`} ${anim.delay ?? 0}ms ${anim.iterationCount ?? 1} ${anim.direction ?? "normal"} forwards;
          }
        `;
      } else {
        // Multi-row or non-linear/custom order:
        // Prevent sliding by "holding" each frame over its interval:
        // For each segment, emit two keyframes with the same position:
        // start% and (nextStart%-epsilon) -> constant pos, jump at boundary.
        const count = frameList.length;
        const step = 100 / count; // segment width
        const eps = 0.001;        // tiny epsilon to avoid interpolation

        let keyframes = "";
        for (let i = 0; i < count; i++) {
          const startPct = i * step;
          const endPct = i === count - 1 ? 100 : (i + 1) * step - eps;
          const { x, y } = xy[i];
          keyframes += `
            ${startPct}% { background-position: ${x}px ${y}px; }
            ${endPct}%   { background-position: ${x}px ${y}px; }
          `;
        }

        css += `
          @keyframes ${id}-${anim.name} {
            ${keyframes}
          }
  
          .sprite-${id}-${anim.name} {
            width: ${source.width}px;
            height: ${source.height}px;
            background-image: url(${source.src});
            background-repeat: no-repeat;
  
            animation: ${id}-${anim.name} ${anim.duration}ms linear ${anim.delay ?? 0}ms ${anim.iterationCount ?? 1} ${anim.direction ?? "normal"} forwards;
          }
        `;
      }
    });

    return css;
  }, [animations, source, id, getFrames, getFrameXY, isValidSource, imageLoaded]);

  // Inject CSS into <style>
  useEffect(() => {
    if (styleRef.current && cssText) {
      styleRef.current.innerHTML = cssText;
    }
  }, [cssText]);

  // Handle animation end event
  const handleAnimationEnd = useCallback(() => {
    if (current) {
      const anim = animations.find((a) => a.name === current);
      onEnd?.(current);
      if (anim?.next) {
        setCurrent(anim.next);
      }
    }
  }, [current, animations, onEnd]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("animationend", handleAnimationEnd);
    return () => el.removeEventListener("animationend", handleAnimationEnd);
  }, [handleAnimationEnd]);

  // Click trigger logic
  const handleClick = useCallback(() => {
    if (trigger === "click" && play) {
      setCurrent(play);
      if (containerRef.current) {
        containerRef.current.classList.add("playing");
        // Remove .playing after animation ends
        const off = () => {
          containerRef.current?.classList.remove("playing");
          containerRef.current?.removeEventListener("animationend", off);
        };
        containerRef.current.addEventListener("animationend", off);
      }
    }
  }, [trigger, play]);

  // Build class names
  const classNames = useMemo(() => {
    const baseClass = current ? `sprite-${id}-${current}` : "";
    const triggerClass =
      trigger === "hover"
        ? "hover-play"
        : trigger === "click"
          ? "click-play"
          : "";

    return `${baseClass} ${triggerClass} ${className}`.trim();
  }, [current, id, trigger, className]);

  // Transform (scale and flip)
  const transformStyle = useMemo(() => {
    return `scale(${scale}) scaleX(${flipX ? -1 : 1}) scaleY(${flipY ? -1 : 1})`;
  }, [scale, flipX, flipY]);

  // Invalid source early return
  if (!isValidSource) {
    if (debug) {
      console.warn(`${spriteAnimatorDisplayName}: Invalid source configuration`, source);
    }
    return null;
  }

  if (!imageLoaded && debug) {
    console.log(`${spriteAnimatorDisplayName}: Image not loaded yet`, source.src);
  }

  return (
    <div
      ref={containerRef}
      className={classNames}
      style={{
        transform: transformStyle,
        outline: debug ? "1px dashed red" : undefined,
        position: "relative",
      }}
      onClick={handleClick}
    >
      {debug && (
        <span
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            fontSize: 10,
            background: "rgba(0,0,0,0.5)",
            color: "white",
            padding: "2px 4px",
          }}
        >
          {current || 'none'}
        </span>
      )}
      <style ref={styleRef}></style>
      <style>{`
        .hover-play:hover { animation-play-state: running !important; }
        .hover-play { animation-play-state: paused !important; }

        .click-play { animation-play-state: paused !important; }
        .click-play.playing { animation-play-state: running !important; }
      `}</style>
    </div>
  );
});

SpriteAnimator.displayName = spriteAnimatorDisplayName;

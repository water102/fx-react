import React, { useState, useEffect } from "react";
import { SpriteAnimator } from "./sprite-animator";

type AnimForm = {
  name: string;
  frames?: string | number[];
  range?: string | [number, number];
  duration: number;
  iterationCount: number | "infinite";
  timingFunction?: string;
  direction?: "normal" | "reverse" | "alternate" | "alternate-reverse";
  next?: string;
};

type DemoSpriteAnimatorProps = React.ComponentProps<typeof SpriteAnimator>;

const AccordionSection: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border rounded">
      <div
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-2 bg-gray-100 font-medium cursor-pointer"
      >
        <span>{title}</span>
        <span>{open ? "−" : "+"}</span>
      </div>
      {open && <div className="p-4 space-y-4">{children}</div>}
    </div>
  );
};

export const DemoSpriteAnimator: React.FC<DemoSpriteAnimatorProps> = (props) => {
  // --- default props from parent---
  const {
    id = "demo",
    source: defaultSource,
    animations: defaultAnimations,
    play: defaultPlay,
    scale: defaultScale = 1,
    flipX: defaultFlipX = false,
    flipY: defaultFlipY = false,
    trigger: defaultTrigger = "manual",
    debug: defaultDebug = false,
    ...rest
  } = props;

  // --- SourceConfig ---
  const [src, setSrc] = useState(defaultSource?.src ?? "");
  const [width, setWidth] = useState(defaultSource?.width ?? 64);
  const [height, setHeight] = useState(defaultSource?.height ?? 64);
  const [totalFrames, setTotalFrames] = useState(defaultSource?.totalFrames ?? 1);
  const [cols, setCols] = useState(defaultSource?.cols ?? 1);
  const [rows, setRows] = useState(defaultSource?.rows ?? 1);

  // --- Animations ---
  // Use functional style to avoid issues with readonly arrays and ensure mutable state
  const [animations, setAnimations] = useState<AnimForm[]>(
    () =>
      (defaultAnimations
        ? [...defaultAnimations] // Create a mutable copy if provided
        : [
          {
            name: "demo",
            frames: "",
            range: "1-1",
            duration: 1000,
            iterationCount: 1,
            timingFunction: "steps(1)",
            direction: "normal",
          },
        ]) as AnimForm[]
  );

  // --- Props ---
  // Use functional style to ensure play is initialized from the correct animation name
  const [play, setPlay] = useState(
    () => defaultPlay ?? (animations[0]?.name ?? "")
  );
  const [scale, setScale] = useState(defaultScale);
  const [flipX, setFlipX] = useState(defaultFlipX);
  const [flipY, setFlipY] = useState(defaultFlipY);
  const [trigger, setTrigger] = useState<"manual" | "hover" | "click">(
    defaultTrigger
  );
  const [debug, setDebug] = useState(defaultDebug);

  // --- Sync when props change ---
  useEffect(() => {
    if (defaultSource) {
      setSrc(defaultSource.src);
      setWidth(defaultSource.width);
      setHeight(defaultSource.height);
      setTotalFrames(defaultSource.totalFrames);
      setCols(defaultSource.cols);
      setRows(defaultSource.rows);
    }
  }, [defaultSource]);

  useEffect(() => {
    if (defaultAnimations) {
      setAnimations(defaultAnimations as any);
    }
  }, [defaultAnimations]);

  useEffect(() => setPlay(defaultPlay ?? ""), [defaultPlay]);
  useEffect(() => setScale(defaultScale), [defaultScale]);
  useEffect(() => setFlipX(defaultFlipX), [defaultFlipX]);
  useEffect(() => setFlipY(defaultFlipY), [defaultFlipY]);
  useEffect(() => setTrigger(defaultTrigger), [defaultTrigger]);
  useEffect(() => setDebug(defaultDebug), [defaultDebug]);

  // --- Build source & animations ---
  const source = { src, width, height, totalFrames, cols, rows };

  const parsedAnimations = animations.map((a) => ({
    name: a.name,
    frames:
      typeof a.frames === "string"
        ? a.frames
          .split(",")
          .filter(Boolean)
          .map((f) => Number(f.trim()))
        : a.frames,
    range:
      typeof a.range === "string" && a.range.includes("-")
        ? [
          Number(a.range.split("-")[0]),
          Number(a.range.split("-")[1]),
        ] as [number, number]
        : (a.range as [number, number] | undefined),
    duration: Number(a.duration),
    iterationCount: a.iterationCount,
    timingFunction: a.timingFunction,
    direction: a.direction,
    next: a.next,
  }));

  const updateAnim = (i: number, patch: Partial<AnimForm>) =>
    setAnimations((prev) =>
      prev.map((a, idx) => (i === idx ? { ...a, ...patch } : a))
    );

  const removeAnim = (i: number) =>
    setAnimations((prev) => prev.filter((_, idx) => idx !== i));

  const addAnim = () =>
    setAnimations((prev) => [
      ...prev,
      {
        name: `anim${prev.length + 1}`,
        frames: "",
        range: "",
        duration: 1000,
        iterationCount: 1,
        timingFunction: "steps(1)",
        direction: "normal",
      },
    ]);

  // --- JSON Export/Import ---
  const [jsonText, setJsonText] = useState("");

  const exportConfig = () => {
    const cfg = {
      source,
      animations,
      props: { play, scale, flipX, flipY, trigger, debug },
    };
    setJsonText(JSON.stringify(cfg, null, 2));
  };

  const importConfig = () => {
    try {
      const cfg = JSON.parse(jsonText);
      setSrc(cfg.source.src);
      setWidth(cfg.source.width);
      setHeight(cfg.source.height);
      setTotalFrames(cfg.source.totalFrames);
      setCols(cfg.source.cols);
      setRows(cfg.source.rows);
      setAnimations(cfg.animations);
      setPlay(cfg.props.play);
      setScale(cfg.props.scale);
      setFlipX(cfg.props.flipX);
      setFlipY(cfg.props.flipY);
      setTrigger(cfg.props.trigger);
      setDebug(cfg.props.debug);
    } catch {
      alert("Invalid JSON config");
    }
  };

  // --- Restart play ---
  const restartPlay = (animName: string) => {
    setPlay("");
    setTimeout(() => setPlay(animName), 0);
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6">
      {/* Display */}
      <div className="border rounded-lg p-4 bg-gray-50 flex justify-center items-center min-h-[150px]">
        {src ? (
          <SpriteAnimator
            id={id}
            source={source}
            animations={parsedAnimations}
            play={play}
            scale={scale}
            flipX={flipX}
            flipY={flipY}
            trigger={trigger}
            debug={debug}
            {...rest}
          />
        ) : (
          <p className="text-gray-400 text-sm">
            ⚠️ Provide SourceConfig to preview the animation
          </p>
        )}
      </div>

      <div className="w-full max-w-4xl space-y-4">
        {/* Accordion: Source */}
        <AccordionSection title="Source Config">
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="src (URL)"
              value={src}
              onChange={(e) => setSrc(e.target.value)}
              className="border rounded px-2 py-1 col-span-2"
            />
            <input
              placeholder="width"
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="border rounded px-2 py-1"
            />
            <input
              placeholder="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="border rounded px-2 py-1"
            />
            <input
              placeholder="totalFrames"
              type="number"
              value={totalFrames}
              onChange={(e) => setTotalFrames(Number(e.target.value))}
              className="border rounded px-2 py-1"
            />
            <input
              placeholder="cols"
              type="number"
              value={cols}
              onChange={(e) => setCols(Number(e.target.value))}
              className="border rounded px-2 py-1"
            />
            <input
              placeholder="rows"
              type="number"
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
              className="border rounded px-2 py-1"
            />
          </div>
        </AccordionSection>

        {/* Accordion: Animations */}
        <AccordionSection title="Animations">
          <button
            onClick={addAnim}
            className="mb-3 px-2 py-1 bg-green-500 text-white rounded"
          >
            + Add Animation
          </button>
          {animations.map((a, i) => (
            <div
              key={i}
              className="border p-3 rounded mb-3 bg-gray-50 space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold">#{i + 1}</span>
                <button
                  onClick={() => removeAnim(i)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  placeholder="Name"
                  value={a.name}
                  onChange={(e) => updateAnim(i, { name: e.target.value })}
                  className="border rounded px-2 py-1"
                />
                <input
                  placeholder="Frames (1,2,3)"
                  value={a.frames as string}
                  onChange={(e) => updateAnim(i, { frames: e.target.value })}
                  className="border rounded px-2 py-1"
                />
                <input
                  placeholder="Range (1-4)"
                  value={a.range as string}
                  onChange={(e) => updateAnim(i, { range: e.target.value })}
                  className="border rounded px-2 py-1"
                />
                <input
                  placeholder="Duration (ms)"
                  type="number"
                  value={a.duration}
                  onChange={(e) =>
                    updateAnim(i, { duration: Number(e.target.value) })
                  }
                  className="border rounded px-2 py-1"
                />
                <input
                  placeholder="IterationCount"
                  value={a.iterationCount.toString()}
                  onChange={(e) =>
                    updateAnim(i, {
                      iterationCount:
                        e.target.value === "infinite"
                          ? "infinite"
                          : Number(e.target.value),
                    })
                  }
                  className="border rounded px-2 py-1"
                />
                <input
                  placeholder="TimingFunction"
                  value={a.timingFunction ?? ""}
                  onChange={(e) =>
                    updateAnim(i, { timingFunction: e.target.value })
                  }
                  className="border rounded px-2 py-1"
                />
                <select
                  value={a.direction}
                  onChange={(e) =>
                    updateAnim(i, {
                      direction: e.target.value as AnimForm["direction"],
                    })
                  }
                  className="border rounded px-2 py-1"
                >
                  <option value="normal">normal</option>
                  <option value="reverse">reverse</option>
                  <option value="alternate">alternate</option>
                  <option value="alternate-reverse">alternate-reverse</option>
                </select>
                <input
                  placeholder="Next"
                  value={a.next ?? ""}
                  onChange={(e) => updateAnim(i, { next: e.target.value })}
                  className="border rounded px-2 py-1"
                />
              </div>
            </div>
          ))}
        </AccordionSection>

        {/* Accordion: Props */}
        <AccordionSection title="Other Props">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label>Play animation</label>
              <div className="flex space-x-2">
                <select
                  value={play}
                  onChange={(e) => setPlay(e.target.value)}
                  className="border rounded px-2 py-1 flex-1"
                >
                  {animations.map((a, i) => (
                    <option key={i} value={a.name}>
                      {a.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => restartPlay(play)}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  ▶ Play
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <label>Scale: {scale.toFixed(1)}x</label>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
              />
            </div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={flipX}
                onChange={(e) => setFlipX(e.target.checked)}
              />
              <span>Flip X</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={flipY}
                onChange={(e) => setFlipY(e.target.checked)}
              />
              <span>Flip Y</span>
            </label>
            <select
              value={trigger}
              onChange={(e) =>
                setTrigger(e.target.value as "manual" | "hover" | "click")
              }
              className="border rounded px-2 py-1"
            >
              <option value="manual">manual</option>
              <option value="hover">hover</option>
              <option value="click">click</option>
            </select>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={debug}
                onChange={(e) => setDebug(e.target.checked)}
              />
              <span>Debug</span>
            </label>
          </div>
        </AccordionSection>

        {/* Accordion: Export/Import */}
        <AccordionSection title="Export / Import Config">
          <div className="flex space-x-2 mb-2">
            <button
              onClick={exportConfig}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Export
            </button>
            <button
              onClick={importConfig}
              className="px-3 py-1 bg-purple-500 text-white rounded"
            >
              Import
            </button>
          </div>
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            rows={8}
            className="w-full border rounded p-2 font-mono text-sm"
            placeholder="JSON config here..."
          />
        </AccordionSection>
      </div>
    </div>
  );
};

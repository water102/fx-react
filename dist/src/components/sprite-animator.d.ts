import { default as React } from 'react';
type SourceConfig = {
    readonly src: string;
    readonly width: number;
    readonly height: number;
    readonly totalFrames: number;
    readonly cols: number;
    readonly rows: number;
};
type AnimationConfig = {
    readonly name: string;
    readonly frames?: readonly number[];
    readonly range?: readonly [number, number];
    readonly duration: number;
    readonly delay?: number;
    readonly iterationCount?: number | "infinite";
    readonly timingFunction?: string;
    readonly direction?: "normal" | "reverse" | "alternate" | "alternate-reverse";
    readonly next?: string;
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
export declare const SpriteAnimator: React.FC<SpriteAnimatorProps>;
export {};

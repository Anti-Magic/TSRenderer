import { Vec4 } from "./Vec4";

export class Mathf {
    public static clamp01(value: number, min: number = 0, max: number = 1): number {
        return Math.max(min, Math.min(value, max));
    }

    public static interpolate(min: number, max: number, gradient: number): number {
        return min + (max - min) * this.clamp01(gradient);
    }
}

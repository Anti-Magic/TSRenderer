import { Vec4 } from "./Vec4";

export class Mathf {
    public static clamp(value: number, min: number = 0, max: number = 1): number {
        return Math.max(min, Math.min(value, max));
    }

    public static lerp(min: number, max: number, gradient: number): number {
        return min + (max - min) * gradient;
    }
}

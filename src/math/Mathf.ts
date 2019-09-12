import { Vec4 } from "./Vec4";
import { Vec3 } from "./Vec3";

export class Mathf {
    public static clamp(value: number, min: number = 0, max: number = 1): number {
        return Math.max(min, Math.min(value, max));
    }

    public static lerp(min: number, max: number, gradient: number): number {
        return min + (max - min) * gradient;
    }

    public static reflect(v: Vec3, n: Vec3): Vec3 {
        return v.sub(n.scale(2 * v.dot(n)));
    }

    public static refract(v: Vec3, n: Vec3, eta: number): Vec3 {
        let dt = v.dot(n);
        let d = 1 - eta * eta * (1 - dt * dt);
        if (d < 0) {
            return null;
        }
        return v.sub(n.scale(dt)).scale(eta).sub(n.scale(Math.sqrt(d)));
    }

    // cos为入射角的余弦，refractive为入射介质的折射率
    // 例如光线从真空射向水，水的折射率为1.33，cos为光线和法线的锐角
    public static fresnelSchlick(cos: number, refractive: number): number {
        let r0 = (1 - refractive) / (1 + refractive);
        let f = r0 * r0;
        return f + (1 - f) * Math.pow(1 - cos, 5);
    }
}

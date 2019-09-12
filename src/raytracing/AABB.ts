import { Vec3 } from "../math/Vec3";
import { Ray } from "./Ray";

export class AABB {
    public min: Vec3;
    public max: Vec3;

    public constructor(min: Vec3, max: Vec3) {
        this.min = min;
        this.max = max;
    }

    // ray = origin + t * direction
    // 与x = x0这条直线相交时，t = (x0 - origin.x) / direction.x
    // 两个区间(s0, e0),(s1, e1)有交集时，必定max(s0, s1) < min(e0, e1)
    public isRayHit(ray: Ray, tmin: number, tmax: number): boolean {
        let t0s = [
            (this.min.x - ray.origin.x) / ray.direction.x,
            (this.min.y - ray.origin.y) / ray.direction.y,
            (this.min.z - ray.origin.z) / ray.direction.z,
        ];
        let t1s = [
            (this.max.x - ray.origin.x) / ray.direction.x,
            (this.max.y - ray.origin.y) / ray.direction.y,
            (this.max.z - ray.origin.z) / ray.direction.z,
        ];
        for (let i = 0; i < 3; i++) {
            let t0 = t0s[i];
            let t1 = t1s[i];
            // 当射线为负方向时
            if (t0 > t1) {
                let tmp = t0;
                t0 = t1;
                t1 = tmp;
            }
            tmin = Math.max(t0, tmin);
            tmax = Math.min(t1, tmax);
            if (tmax < tmin) {
                return false;
            }
        }
        return true;
    }
}

import { Vec3 } from "../math/Vec3";
import { Ray } from "./Ray";
import { RaycastInfo } from "./RaycastInfo";

export class Utils {
    public static randomInUnitSphere(): Vec3 {
        while (true) {
            let v = new Vec3(Math.random(), Math.random(), Math.random());
            let p = v.scale(2).sub(new Vec3(1, 1, 1));
            if (p.dot(p) < 1.0) {
                return p;
            }
        }
    }

    public static randomInUnitDisk(): Vec3 {
        while (true) {
            let v = new Vec3(Math.random(), Math.random(), 0);
            let p = v.scale(2).sub(new Vec3(1, 1, 0));
            if (p.dot(p) < 1.0) {
                return p;
            }
        }
    }
}

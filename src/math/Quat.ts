import { Vec3 } from "./Vec3";
import { Mat4 } from "./Mat4";

export class Quat {
    public x: number;
    public y: number;
    public z: number;
    public w: number;

    public constructor(x=0, y=0, z=0, w=1) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    public static fromAxisAngle(axis: Vec3, rad: number): Quat {
        let halfRad = rad * 0.5;
        let sin = Math.sin(halfRad);
        return new Quat(
            sin * axis.x,
            sin * axis.y,
            sin * axis.z,
            Math.cos(halfRad)
        );
    }

    public static fromEular(v: Vec3): Quat {
        let sx = Math.sin(v.x * 0.5);
        let cx = Math.cos(v.x * 0.5);
        let sy = Math.sin(v.y * 0.5);
        let cy = Math.cos(v.y * 0.5);
        let sz = Math.sin(v.z * 0.5);
        let cz = Math.cos(v.z * 0.5);
        return new Quat(
            (cx * sy * cz) + (sx * cy * sz),
            (sx * cy * cz) - (cx * sy * sz),
            (cx * cy * sz) - (sx * sy * cz),
            (cx * cy * cz) + (sx * sy * sz),
        );
    }

    public static fromMat4(m: Mat4): Quat {
        let m11 = m.d[0][0], m12 = m.d[1][0], m13 = m.d[2][0];
        let m21 = m.d[0][1], m22 = m.d[1][1], m23 = m.d[2][1];
        let m31 = m.d[0][2], m32 = m.d[1][2], m33 = m.d[2][2];
        let trace = m11 + m22 + m33;
        let s = 0;
        let res = new Quat();
        if (trace > 0) {
            s = 0.5 / Math.sqrt(trace + 1.0);
            res.w = 0.25 / s;
            res.x = (m32 - m23) * s;
            res.y = (m13 - m31) * s;
            res.z = (m21 - m12) * s;
        }
        else if (m11 > m22 && m11 > m33) {
            s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);
            res.w = (m32 - m23) / s;
            res.x = 0.25 * s;
            res.y = (m12 + m21) / s;
            res.z = (m13 + m31) / s;
        }
        else if (m22 > m33) {
            s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);
            res.w = (m13 - m31) / s;
            res.x = (m12 + m21) / s;
            res.y = 0.25 * s;
            res.z = (m23 + m32) / s;
        }
        else {
            s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);
            res.w = (m21 - m12) / s;
            res.x = (m13 + m31) / s;
            res.y = (m23 + m32) / s;
            res.z = 0.25 * s;
        }
        return res;
    }

    public mul(rhs: Quat): Quat {
        let ax = this.x;
        let ay = this.y;
        let az = this.z;
        let aw = this.w;
        let bx = rhs.x;
        let by = rhs.y;
        let bz = rhs.z;
        let bw = rhs.w;
        return new Quat(
            ax * bw + aw * bx + ay * bz - az * by,
            ay * bw + aw * by + az * bx - ax * bz,
            az * bw + aw * bz + ax * by - ay * bx,
            aw * bw - ax * bx - ay * by - az * bz
        );
    }

    public static slerp(left: Quat, right: Quat, amount: number) {
        let num2 = 0;
        let num3 = 0;
        let num4 = (((left.x * right.x) + (left.y * right.y)) + (left.z * right.z)) + (left.w * right.w);
        let flag = false;
        if (num4 < 0) {
            flag = true;
            num4 = -num4;
        }
        if (num4 > 0.999999) {
            num3 = 1 - amount;
            num2 = flag ? -amount : amount;
        }
        else {
            let num5 = Math.acos(num4);
            let num6 = (1.0 / Math.sin(num5));
            num3 = (Math.sin((1.0 - amount) * num5)) * num6;
            num2 = flag ? ((-Math.sin(amount * num5)) * num6) : ((Math.sin(amount * num5)) * num6);
        }
        return new Quat(
            (num3 * left.x) + (num2 * right.x),
            (num3 * left.y) + (num2 * right.y),
            (num3 * left.z) + (num2 * right.z),
            (num3 * left.w) + (num2 * right.w),
        );
    }
}

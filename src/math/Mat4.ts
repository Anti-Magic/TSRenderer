import { Vec4 } from "./Vec4";
import { Quat } from "./Quat";

export class Mat4 {
    public d: number[][];

    public constructor() {
        this.d = new Array<number[]>(4);
        for (let i = 0; i < 4; i++) {
            this.d[i] = new Array<number>(4);
            for (let j = 0; j < 4; j++) {
                this.d[i][j] = 0;
            }
        }
        this.d[0][0] = this.d[1][1] = this.d[2][2] = this.d[3][3] = 1;
    }

    public post(rhs: Mat4): Mat4 {
        let res = new Mat4();
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                res.d[i][j] =
                    this.d[i][0] * rhs.d[0][j] +
                    this.d[i][1] * rhs.d[1][j] +
                    this.d[i][2] * rhs.d[2][j] +
                    this.d[i][3] * rhs.d[3][j];
            }
        }
        return res;
    }

    public transpose(): Mat4 {
        let res = new Mat4();
        res.d[0][0] = this.d[0][0];
        res.d[0][1] = this.d[1][0];
        res.d[0][2] = this.d[2][0];
        res.d[0][3] = this.d[3][0];
        res.d[1][0] = this.d[0][1];
        res.d[1][1] = this.d[1][1];
        res.d[1][2] = this.d[2][1];
        res.d[1][3] = this.d[3][1];
        res.d[2][0] = this.d[0][2];
        res.d[2][1] = this.d[1][2];
        res.d[2][2] = this.d[2][2];
        res.d[2][3] = this.d[3][2];
        res.d[3][0] = this.d[0][3];
        res.d[3][1] = this.d[1][3];
        res.d[3][2] = this.d[2][3];
        res.d[3][3] = this.d[3][3];
        return res;
    }

    public inverse(): Mat4 {
        let res = new Mat4();
        res.d[0][0] = this.d[1][2]*this.d[2][3]*this.d[3][1] - this.d[1][3]*this.d[2][2]*this.d[3][1] + this.d[1][3]*this.d[2][1]*this.d[3][2] - this.d[1][1]*this.d[2][3]*this.d[3][2] - this.d[1][2]*this.d[2][1]*this.d[3][3] + this.d[1][1]*this.d[2][2]*this.d[3][3];
        res.d[0][1] = this.d[0][3]*this.d[2][2]*this.d[3][1] - this.d[0][2]*this.d[2][3]*this.d[3][1] - this.d[0][3]*this.d[2][1]*this.d[3][2] + this.d[0][1]*this.d[2][3]*this.d[3][2] + this.d[0][2]*this.d[2][1]*this.d[3][3] - this.d[0][1]*this.d[2][2]*this.d[3][3];
        res.d[0][2] = this.d[0][2]*this.d[1][3]*this.d[3][1] - this.d[0][3]*this.d[1][2]*this.d[3][1] + this.d[0][3]*this.d[1][1]*this.d[3][2] - this.d[0][1]*this.d[1][3]*this.d[3][2] - this.d[0][2]*this.d[1][1]*this.d[3][3] + this.d[0][1]*this.d[1][2]*this.d[3][3];
        res.d[0][3] = this.d[0][3]*this.d[1][2]*this.d[2][1] - this.d[0][2]*this.d[1][3]*this.d[2][1] - this.d[0][3]*this.d[1][1]*this.d[2][2] + this.d[0][1]*this.d[1][3]*this.d[2][2] + this.d[0][2]*this.d[1][1]*this.d[2][3] - this.d[0][1]*this.d[1][2]*this.d[2][3];
        res.d[1][0] = this.d[1][3]*this.d[2][2]*this.d[3][0] - this.d[1][2]*this.d[2][3]*this.d[3][0] - this.d[1][3]*this.d[2][0]*this.d[3][2] + this.d[1][0]*this.d[2][3]*this.d[3][2] + this.d[1][2]*this.d[2][0]*this.d[3][3] - this.d[1][0]*this.d[2][2]*this.d[3][3];
        res.d[1][1] = this.d[0][2]*this.d[2][3]*this.d[3][0] - this.d[0][3]*this.d[2][2]*this.d[3][0] + this.d[0][3]*this.d[2][0]*this.d[3][2] - this.d[0][0]*this.d[2][3]*this.d[3][2] - this.d[0][2]*this.d[2][0]*this.d[3][3] + this.d[0][0]*this.d[2][2]*this.d[3][3];
        res.d[1][2] = this.d[0][3]*this.d[1][2]*this.d[3][0] - this.d[0][2]*this.d[1][3]*this.d[3][0] - this.d[0][3]*this.d[1][0]*this.d[3][2] + this.d[0][0]*this.d[1][3]*this.d[3][2] + this.d[0][2]*this.d[1][0]*this.d[3][3] - this.d[0][0]*this.d[1][2]*this.d[3][3];
        res.d[1][3] = this.d[0][2]*this.d[1][3]*this.d[2][0] - this.d[0][3]*this.d[1][2]*this.d[2][0] + this.d[0][3]*this.d[1][0]*this.d[2][2] - this.d[0][0]*this.d[1][3]*this.d[2][2] - this.d[0][2]*this.d[1][0]*this.d[2][3] + this.d[0][0]*this.d[1][2]*this.d[2][3];
        res.d[2][0] = this.d[1][1]*this.d[2][3]*this.d[3][0] - this.d[1][3]*this.d[2][1]*this.d[3][0] + this.d[1][3]*this.d[2][0]*this.d[3][1] - this.d[1][0]*this.d[2][3]*this.d[3][1] - this.d[1][1]*this.d[2][0]*this.d[3][3] + this.d[1][0]*this.d[2][1]*this.d[3][3];
        res.d[2][1] = this.d[0][3]*this.d[2][1]*this.d[3][0] - this.d[0][1]*this.d[2][3]*this.d[3][0] - this.d[0][3]*this.d[2][0]*this.d[3][1] + this.d[0][0]*this.d[2][3]*this.d[3][1] + this.d[0][1]*this.d[2][0]*this.d[3][3] - this.d[0][0]*this.d[2][1]*this.d[3][3];
        res.d[2][2] = this.d[0][1]*this.d[1][3]*this.d[3][0] - this.d[0][3]*this.d[1][1]*this.d[3][0] + this.d[0][3]*this.d[1][0]*this.d[3][1] - this.d[0][0]*this.d[1][3]*this.d[3][1] - this.d[0][1]*this.d[1][0]*this.d[3][3] + this.d[0][0]*this.d[1][1]*this.d[3][3];
        res.d[2][3] = this.d[0][3]*this.d[1][1]*this.d[2][0] - this.d[0][1]*this.d[1][3]*this.d[2][0] - this.d[0][3]*this.d[1][0]*this.d[2][1] + this.d[0][0]*this.d[1][3]*this.d[2][1] + this.d[0][1]*this.d[1][0]*this.d[2][3] - this.d[0][0]*this.d[1][1]*this.d[2][3];
        res.d[3][0] = this.d[1][2]*this.d[2][1]*this.d[3][0] - this.d[1][1]*this.d[2][2]*this.d[3][0] - this.d[1][2]*this.d[2][0]*this.d[3][1] + this.d[1][0]*this.d[2][2]*this.d[3][1] + this.d[1][1]*this.d[2][0]*this.d[3][2] - this.d[1][0]*this.d[2][1]*this.d[3][2];
        res.d[3][1] = this.d[0][1]*this.d[2][2]*this.d[3][0] - this.d[0][2]*this.d[2][1]*this.d[3][0] + this.d[0][2]*this.d[2][0]*this.d[3][1] - this.d[0][0]*this.d[2][2]*this.d[3][1] - this.d[0][1]*this.d[2][0]*this.d[3][2] + this.d[0][0]*this.d[2][1]*this.d[3][2];
        res.d[3][2] = this.d[0][2]*this.d[1][1]*this.d[3][0] - this.d[0][1]*this.d[1][2]*this.d[3][0] - this.d[0][2]*this.d[1][0]*this.d[3][1] + this.d[0][0]*this.d[1][2]*this.d[3][1] + this.d[0][1]*this.d[1][0]*this.d[3][2] - this.d[0][0]*this.d[1][1]*this.d[3][2];
        res.d[3][3] = this.d[0][1]*this.d[1][2]*this.d[2][0] - this.d[0][2]*this.d[1][1]*this.d[2][0] + this.d[0][2]*this.d[1][0]*this.d[2][1] - this.d[0][0]*this.d[1][2]*this.d[2][1] - this.d[0][1]*this.d[1][0]*this.d[2][2] + this.d[0][0]*this.d[1][1]*this.d[2][2];

        let determinant =
            res.d[0][3]*res.d[1][2]*res.d[2][1]*res.d[3][0] - res.d[0][2]*res.d[1][3]*res.d[2][1]*res.d[3][0] - res.d[0][3]*res.d[1][1]*res.d[2][2]*res.d[3][0] + res.d[0][1]*res.d[1][3]*res.d[2][2]*res.d[3][0] +
            res.d[0][2]*res.d[1][1]*res.d[2][3]*res.d[3][0] - res.d[0][1]*res.d[1][2]*res.d[2][3]*res.d[3][0] - res.d[0][3]*res.d[1][2]*res.d[2][0]*res.d[3][1] + res.d[0][2]*res.d[1][3]*res.d[2][0]*res.d[3][1] +
            res.d[0][3]*res.d[1][0]*res.d[2][2]*res.d[3][1] - res.d[0][0]*res.d[1][3]*res.d[2][2]*res.d[3][1] - res.d[0][2]*res.d[1][0]*res.d[2][3]*res.d[3][1] + res.d[0][0]*res.d[1][2]*res.d[2][3]*res.d[3][1] +
            res.d[0][3]*res.d[1][1]*res.d[2][0]*res.d[3][2] - res.d[0][1]*res.d[1][3]*res.d[2][0]*res.d[3][2] - res.d[0][3]*res.d[1][0]*res.d[2][1]*res.d[3][2] + res.d[0][0]*res.d[1][3]*res.d[2][1]*res.d[3][2] +
            res.d[0][1]*res.d[1][0]*res.d[2][3]*res.d[3][2] - res.d[0][0]*res.d[1][1]*res.d[2][3]*res.d[3][2] - res.d[0][2]*res.d[1][1]*res.d[2][0]*res.d[3][3] + res.d[0][1]*res.d[1][2]*res.d[2][0]*res.d[3][3] +
            res.d[0][2]*res.d[1][0]*res.d[2][1]*res.d[3][3] - res.d[0][0]*res.d[1][2]*res.d[2][1]*res.d[3][3] - res.d[0][1]*res.d[1][0]*res.d[2][2]*res.d[3][3] + res.d[0][0]*res.d[1][1]*res.d[2][2]*res.d[3][3];

        let r = 1.0 / determinant;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                res.d[i][j] *= r;
            }
        }
        return res;
    }

    public static translate(v: Vec4): Mat4 {
        let res = new Mat4();
        res.d[3][0] = v.d[0];
        res.d[3][1] = v.d[1];
        res.d[3][2] = v.d[2];
        res.d[3][3] = 1;
        return res;
    }

    public static rotate(q: Quat): Mat4 {
        let res = new Mat4();
        let x2 = q.d[0] + q.d[0];
        let y2 = q.d[1] + q.d[1];
        let z2 = q.d[2] + q.d[2];
        let xx = q.d[0] * x2;
        let xy = q.d[0] * y2;
        let xz = q.d[0] * z2;
        let yy = q.d[1] * y2;
        let yz = q.d[1] * z2;
        let zz = q.d[2] * z2;
        let wx = q.d[3] * x2;
        let wy = q.d[3] * y2;
        let wz = q.d[3] * z2;
        res.d[0][0] = 1 - (yy + zz);
        res.d[1][0] = xy + wz;
        res.d[2][0] = xz - wy;
        res.d[3][0] = 0;
        res.d[0][1] = xy - wz;
        res.d[1][1] = 1 - (xx + zz);
        res.d[2][1] = yz + wx;
        res.d[3][1] = 0;
        res.d[0][2] = xz + wy;
        res.d[1][2] = yz - wx;
        res.d[2][2] = 1 - (xx + yy);
        res.d[3][2] = 0;
        res.d[0][3] = 0;
        res.d[1][3] = 0;
        res.d[2][3] = 0;
        res.d[3][3] = 1;
        return res;
    }

    public static scale(v: Vec4): Mat4 {
        let res = new Mat4();
        res.d[0][0] = v.d[0];
        res.d[1][1] = v.d[1];
        res.d[2][2] = v.d[2];
        res.d[3][3] = 1;
        return res;
    }

    public static lookAt(eye: Vec4, center: Vec4, up: Vec4): Mat4 {
        let zAxis = center.sub(eye).normalize();
        let xAxis = up.cross(zAxis).normalize();
        let yAxis = zAxis.cross(xAxis).normalize();
        let res = new Mat4();
        res.d[0][0] = xAxis.x;
        res.d[0][1] = xAxis.y;
        res.d[0][2] = xAxis.z;
        res.d[1][0] = yAxis.x;
        res.d[1][1] = yAxis.y;
        res.d[1][2] = yAxis.z;
        res.d[2][0] = zAxis.x;
        res.d[2][1] = zAxis.y;
        res.d[2][2] = zAxis.z;
        res.d[0][3] = -xAxis.dot(eye);
        res.d[1][3] = -yAxis.dot(eye);
        res.d[2][3] = -zAxis.dot(eye);
        return res;
    }

    public static perspective(fov: number, aspect: number, zNear: number, zFar: number): Mat4 {
        let t = 1.0 / (Math.tan(fov * 0.5));
        let res = new Mat4();
        res.d[0][0] = t / aspect;;
        res.d[1][1] = t;
        res.d[2][2] = (zFar + zNear) / (zFar - zNear);
        res.d[2][3] = 1.0;
        res.d[3][2] = -2.0 * zFar * zNear / (zFar - zNear);
        res.d[3][3] = 0.0;
        return res;
    }
}

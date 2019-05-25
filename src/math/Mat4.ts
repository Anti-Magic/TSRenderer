import { Vec3 } from "./Vec3";
import { Quat } from "./Quat";

export class Mat4 {
    public d: number[][];

    public constructor(
        a00=1, a01=0, a02=0, a03=0,
        a10=0, a11=1, a12=0, a13=0,
        a20=0, a21=0, a22=1, a23=0,
        a30=0, a31=0, a32=0, a33=1) {
        this.d = new Array<number[]>(4);
        for (let i = 0; i < 4; i++) {
            this.d[i] = new Array<number>(4);
        }
        this.d[0][0] = a00; this.d[0][1] = a01; this.d[0][2] = a02; this.d[0][3] = a03;
        this.d[1][0] = a10; this.d[1][1] = a11; this.d[1][2] = a12; this.d[1][3] = a13;
        this.d[2][0] = a20; this.d[2][1] = a21; this.d[2][2] = a22; this.d[2][3] = a23;
        this.d[3][0] = a30; this.d[3][1] = a31; this.d[3][2] = a32; this.d[3][3] = a33;
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

    public static translate(v: Vec3): Mat4 {
        return new Mat4(
            1,   0,   0,   0,
            0,   1,   0,   0,
            0,   0,   1,   0,
            v.x, v.y, v.z, 1,
        );
    }

    public static rotate(q: Quat): Mat4 {
        // https://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToMatrix/jay.htm
        // 这里找到的碉堡做法，暂未验证
        // let m1 = new Mat4(
        //     q.w, q.z, -q.y, q.x,
        //     -q.z, q.w, q.x, q.y,
        //     q.y, -q.x, q.w, q.z,
        //     -q.x, -q.y, -q.z, q.w
        // );
        // let m2 = new Mat4(
        //     q.w, q.z, -q.y, -q.x,
        //     -q.z, q.w, q.x, -q.y,
        //     q.y, -q.x, q.w, -q.z,
        //     q.x, q.y, q.z, q.w
        // );
        // return m1.post(m2);

        let res = new Mat4();
        let xx = q.x * q.x * 2;
        let xy = q.x * q.y * 2;
        let xz = q.x * q.z * 2;
        let yy = q.y * q.y * 2;
        let yz = q.y * q.z * 2;
        let zz = q.z * q.z * 2;
        let wx = q.w * q.x * 2;
        let wy = q.w * q.y * 2;
        let wz = q.w * q.z * 2;
        res.d[0][0] = 1 - (yy + zz);
        res.d[0][1] = xy + wz;
        res.d[0][2] = xz - wy;
        res.d[0][3] = 0;
        res.d[1][0] = xy - wz;
        res.d[1][1] = 1 - (xx + zz);
        res.d[1][2] = yz + wx;
        res.d[1][3] = 0;
        res.d[2][0] = xz + wy;
        res.d[2][1] = yz - wx;
        res.d[2][2] = 1 - (xx + yy);
        res.d[2][3] = 0;
        res.d[3][0] = 0;
        res.d[3][1] = 0;
        res.d[3][2] = 0;
        res.d[3][3] = 1;
        return res;
    }

    public static scale(v: Vec3): Mat4 {
        return new Mat4(
            v.x, 0,   0,   0,
            0,   v.y, 0,   0,
            0,   0,   v.z, 0,
            0,   0,   0,   1,
        );
    }

    public static lookAt(eye: Vec3, center: Vec3, up: Vec3): Mat4 {
        let zAxis = center.sub(eye).normalize();
        let xAxis = up.cross(zAxis).normalize();
        let yAxis = zAxis.cross(xAxis).normalize();
        let tx = -xAxis.dot(eye);
        let ty = -yAxis.dot(eye);
        let tz = -zAxis.dot(eye);
        return new Mat4(
            xAxis.x, yAxis.x, zAxis.x, 0,
            xAxis.y, yAxis.y, zAxis.y, 0,
            xAxis.z, yAxis.z, zAxis.z, 0,
            tx,      ty,      tz,      1,
        );
    }

    public static perspective(fovy: number, aspect: number, zNear: number, zFar: number): Mat4 {
        let t = 1.0 / Math.tan(fovy * 0.5);
        let res = new Mat4();
        res.d[0][0] = t / aspect;
        res.d[1][1] = t;
        res.d[2][3] = 1.0;
        res.d[3][3] = 0.0;
        // [-1, 1]
        // res.d[2][2] = (zFar + zNear) / (zFar - zNear);
        // res.d[3][2] = (-2.0 * zFar * zNear) / (zFar - zNear);
        // [0, 1]
        res.d[2][2] = zFar / (zFar - zNear);
        res.d[3][2] = -(zFar * zNear) / (zFar - zNear);
        return res;
    }
}

import { Vec3 } from "../math/Vec3";
import { Quat } from "../math/Quat";
import { Mat4 } from "../math/Mat4";
import { Entity } from "./Entity";

export class Camera {
    public _viewMatrix: Mat4;
    public _projMatrix: Mat4;

    public get viewMatrix() {
        return this._viewMatrix;
    }

    public set viewMatrix(value) {
        this._viewMatrix = value;
    }

    public get projMatrix() {
        return this._projMatrix;
    }

    public set projMatrix(value) {
        this._projMatrix = value;
    }

    public get viewProjMatrix() {
        return this.viewMatrix.post(this.projMatrix);
    }
}

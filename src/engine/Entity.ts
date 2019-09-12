import { Vec3 } from "../math/Vec3";
import { Quat } from "../math/Quat";
import { Mat4 } from "../math/Mat4";

export class Entity {
    private _pos: Vec3;
    private _rot: Quat;
    private _scale: Vec3;
    private _transformDirty;

    public get position() {
        return this._pos;
    }

    public set position(val: Vec3) {
        this._pos = val;
        this._transformDirty = true;
    }

    public get rotation() {
        return this._rot;
    }

    public set rotation(val: Quat) {
        this._rot = val;
        this._transformDirty = true;
    }

    public get scale() {
        return this._scale;
    }

    public set scale(val: Vec3) {
        this._scale = val;
        this._transformDirty = true;
    }

    public lookAt(center: Vec3, up: Vec3) {
        let viewMat = Mat4.lookAt(this.position, center, up);
        this.rotation = Quat.fromMat4(viewMat.inverse());
    }
}

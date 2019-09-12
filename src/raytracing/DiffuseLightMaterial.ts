import { Material } from "./Material";
import { Vec4 } from "../math/Vec4";
import { Ray } from "./Ray";
import { RaycastInfo } from "./RaycastInfo";
import { Utils } from "./Utils";
import { Mathf } from "../math/Mathf";
import { Texture } from "../Texture";

export class DiffuseLightMaterial implements Material {
    private emit: Texture;

    public constructor(emit: Texture) {
        this.emit = emit;
    }

    public getAlbedo(pos: Vec4) : Vec4 {
        return new Vec4(0, 0, 0, 1);
    }

    public getScatteredRay(ray: Ray, hit: RaycastInfo) : Ray {
        return null;
    }

    public getEmit(pos: Vec4): Vec4 {
        return this.emit.getColor(pos);
    }
}

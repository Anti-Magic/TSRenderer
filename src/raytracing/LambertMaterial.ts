import { Material } from "./Material";
import { Vec4 } from "../math/Vec4";
import { Ray } from "./Ray";
import { RaycastInfo } from "./RaycastInfo";
import { Utils } from "./Utils";
import { Mathf } from "../math/Mathf";
import { Texture } from "../Texture";

export class LambertMaterial implements Material {
    private albedo: Texture;

    public constructor(albedo: Texture) {
        this.albedo = albedo;
    }

    public getAlbedo(pos: Vec4) : Vec4 {
        return this.albedo.getColor(pos);
    }

    public getScatteredRay(ray: Ray, hit: RaycastInfo) : Ray {
        let direction = hit.normal.add(Utils.randomInUnitSphere()).normalize();
        return new Ray(hit.position, direction);
    }

    public getEmit(pos: Vec4): Vec4 {
        return new Vec4(0, 0, 0, 1);
    }
}

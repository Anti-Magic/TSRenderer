import { Material } from "./Material";
import { Vec4 } from "../math/Vec4";
import { Ray } from "./Ray";
import { RaycastInfo } from "./RaycastInfo";
import { Utils } from "./Utils";
import { Mathf } from "../math/Mathf";

export class MatelMaterial implements Material {
    private albedo: Vec4;
    private fuzz: number;

    public constructor(albedo: Vec4, fuzz: number) {
        this.albedo = albedo;
        this.fuzz = fuzz;
    }

    public getAlbedo(pos: Vec4) : Vec4 {
        return this.albedo;
    }

    public getScatteredRay(ray: Ray, hit: RaycastInfo) : Ray {
        let reflectVec = Mathf.reflect(ray.direction, hit.normal);
        let direction = reflectVec.add(Utils.randomInUnitSphere().scale(this.fuzz)).normalize();
        if (direction.dot(hit.normal) > 0) {
            return new Ray(hit.position, direction);
        }
        return null;
    }

    public getEmit(pos: Vec4): Vec4 {
        return new Vec4(0, 0, 0, 1);
    }
}

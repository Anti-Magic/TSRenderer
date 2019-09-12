import { Geometry } from "./Geometry";
import { AABB } from "./AABB";
import { Ray } from "./Ray";
import { RaycastInfo } from "./RaycastInfo";
import { Material } from "./Material";
import { Vec3 } from "../math/Vec3";
import { Vec2 } from "../math/Vec2";
import { XYRect } from "./XYRect";
import { XZRect } from "./XZRect";
import { YZRect } from "./YZRect";

export class Box implements Geometry {
    public min: Vec3;
    public max: Vec3;
    public material: Material;
    public aabb: AABB;
    public faces: Geometry[];

    public constructor(min: Vec3, max: Vec3, material: Material) {
        this.min = min;
        this.max = max;
        this.material = material;
        this.aabb = new AABB(min, max);
        this.faces = [
            new XYRect(min.x, max.x, min.y, max.y, max.z, material),
            new XYRect(min.x, max.x, min.y, max.y, min.z, material),
            new XZRect(min.x, max.x, min.z, max.z, max.y, material),
            new XZRect(min.x, max.x, min.z, max.z, min.y, material),
            new YZRect(min.y, max.y, min.z, max.z, max.x, material),
            new YZRect(min.y, max.y, min.z, max.z, min.x, material),
        ];
    }

    public getAABB(): AABB {
        return this.aabb;
    }

    public raycast(ray: Ray, minDistance: number, maxDistance: number): RaycastInfo {
        let result = null;
        let closest = maxDistance;
        this.faces.forEach(g => {
            let info = g.raycast(ray, minDistance, closest);
            if (info != null) {
                result = info;
                closest = info.distance;
            }
        });
        return result;
    }
}

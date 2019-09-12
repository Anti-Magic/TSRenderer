import { Geometry } from "./Geometry";
import { AABB } from "./AABB";
import { Ray } from "./Ray";
import { RaycastInfo } from "./RaycastInfo";
import { Material } from "./Material";
import { Vec3 } from "../math/Vec3";
import { Vec2 } from "../math/Vec2";

export class XYRect implements Geometry {
    public x0: number; 
    public x1: number; 
    public y0: number; 
    public y1: number;
    public z: number;
    public material: Material;
    private aabb: AABB;

    public constructor(x0: number, x1: number, y0: number, y1: number, z: number, material: Material) {
        this.x0 = x0;
        this.x1 = x1;
        this.y0 = y0;
        this.y1 = y1;
        this.z = z;
        this.material = material;
        // this.aabb = new AABB(
        //     new Vec3(x0, y0, z - 0.0001),
        //     new Vec3(x1, y1, z + 0.0001));
        this.aabb = new AABB(
            new Vec3(x0, y0, z),
            new Vec3(x1, y1, z));
    }

    public getAABB(): AABB {
        return this.aabb;
    }

    public raycast(ray: Ray, minDistance: number, maxDistance: number): RaycastInfo {
        let t = (this.z - ray.origin.z) / ray.direction.z;
        if (t <= minDistance || t >= maxDistance) {
            return null;
        }
        let x = ray.origin.x + t * ray.direction.x;
        if (x < this.x0 || x > this.x1) {
            return null;
        }
        let y = ray.origin.y + t * ray.direction.y;
        if (y < this.y0 || y > this.y1) {
            return null;
        }
        let hit = new RaycastInfo();
        hit.distance = t;
        hit.position = ray.GetPoint(t);
        if (ray.direction.z > 0) {
            hit.normal = new Vec3(0, 0, -1);
            hit.isFront = false;
        }
        else {
            hit.normal = new Vec3(0, 0, 1);
            hit.isFront = true;
        }
        hit.uv = new Vec2((x - this.x0) / (this.x1 - this.x0), (y - this.y0) / (this.y1 - this.y0));
        hit.material = this.material;
        return hit;
    }
}

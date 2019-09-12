import { Geometry } from "./Geometry";
import { AABB } from "./AABB";
import { Ray } from "./Ray";
import { RaycastInfo } from "./RaycastInfo";
import { Material } from "./Material";
import { Vec3 } from "../math/Vec3";
import { Vec2 } from "../math/Vec2";

export class YZRect implements Geometry {
    public y0: number; 
    public y1: number; 
    public z0: number; 
    public z1: number;
    public x: number;
    public material: Material;
    private aabb: AABB;

    public constructor(y0: number, y1: number, z0: number, z1: number, x: number, material: Material) {
        this.y0 = y0;
        this.y1 = y1;
        this.z0 = z0;
        this.z1 = z1;
        this.x = x;
        this.material = material;
        // this.aabb = new AABB(
        //     new Vec3(x - 0.0001, y0, z0),
        //     new Vec3(x + 0.0001, y1, z1));
        this.aabb = new AABB(
            new Vec3(x, y0, z0),
            new Vec3(x, y1, z1));
    }

    public getAABB(): AABB {
        return this.aabb;
    }

    public raycast(ray: Ray, minDistance: number, maxDistance: number): RaycastInfo {
        let t = (this.x - ray.origin.x) / ray.direction.x;
        if (t <= minDistance || t >= maxDistance) {
            return null;
        }
        let y = ray.origin.y + t * ray.direction.y;
        if (y < this.y0 || y > this.y1) {
            return null;
        }
        let z = ray.origin.z + t * ray.direction.z;
        if (z < this.z0 || z > this.z1) {
            return null;
        }
        let hit = new RaycastInfo();
        hit.distance = t;
        hit.position = ray.GetPoint(t);
        if (ray.direction.x > 0) {
            hit.normal = new Vec3(-1, 0, 0);
            hit.isFront = false;
        }
        else {
            hit.normal = new Vec3(1, 0, 0);
            hit.isFront = true;
        }
        hit.uv = new Vec2((y - this.y0) / (this.y1 - this.y0), (z - this.z0) / (this.z1 - this.z0));
        hit.material = this.material;
        return hit;
    }
}

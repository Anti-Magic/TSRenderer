import { Geometry } from "./Geometry";
import { AABB } from "./AABB";
import { Ray } from "./Ray";
import { RaycastInfo } from "./RaycastInfo";
import { Material } from "./Material";
import { Vec3 } from "../math/Vec3";
import { Vec2 } from "../math/Vec2";

export class XZRect implements Geometry {
    public x0: number; 
    public x1: number; 
    public z0: number; 
    public z1: number;
    public y: number;
    public material: Material;
    private aabb: AABB;

    public constructor(x0: number, x1: number, z0: number, z1: number, y: number, material: Material) {
        this.x0 = x0;
        this.x1 = x1;
        this.z0 = z0;
        this.z1 = z1;
        this.y = y;
        this.material = material;
        // this.aabb = new AABB(
        //     new Vec3(x0, y - 0.0001, z0),
        //     new Vec3(x1, y + 0.0001, z1));
        this.aabb = new AABB(
            new Vec3(x0, y, z0),
            new Vec3(x1, y, z1));
    }

    public getAABB(): AABB {
        return this.aabb;
    }

    public raycast(ray: Ray, minDistance: number, maxDistance: number): RaycastInfo {
        let t = (this.y - ray.origin.y) / ray.direction.y;
        if (t <= minDistance || t >= maxDistance) {
            return null;
        }
        let x = ray.origin.x + t * ray.direction.x;
        if (x < this.x0 || x > this.x1) {
            return null;
        }
        let z = ray.origin.z + t * ray.direction.z;
        if (z < this.z0 || z > this.z1) {
            return null;
        }
        let hit = new RaycastInfo();
        hit.distance = t;
        hit.position = ray.GetPoint(t);
        if (ray.direction.y > 0) {
            hit.normal = new Vec3(0, -1, 0);
            hit.isFront = false;
        }
        else {
            hit.normal = new Vec3(0, 1, 0);
            hit.isFront = true;
        }
        hit.uv = new Vec2((x - this.x0) / (this.x1 - this.x0), (z - this.z0) / (this.z1 - this.z0));
        hit.material = this.material;
        return hit;
    }
}

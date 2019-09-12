import { Vec3 } from "../math/Vec3";
import { Ray } from "./Ray";
import { RaycastInfo } from "./RaycastInfo";
import { Geometry } from "./Geometry";
import { Material } from "./Material";
import { AABB } from "./AABB";
import { Vec2 } from "../math/Vec2";

export class Sphere implements Geometry {
    public center: Vec3;
    public radius: number;
    public material: Material;
    private aabb: AABB;

    public constructor(center: Vec3, radius: number, material: Material) {
        this.center = center;
        this.radius = radius;
        this.material = material;
        this.aabb = new AABB(
            new Vec3(this.center.x - this.radius, this.center.y - this.radius, this.center.z - this.radius),
            new Vec3(this.center.x + this.radius, this.center.y + this.radius, this.center.z + this.radius));
    }

    public getAABB(): AABB {
        return this.aabb;
    }

    public raycast(ray: Ray, minDistance: number, maxDistance: number): RaycastInfo {
        let oc = ray.origin.sub(this.center);
        let a = ray.direction.dot(ray.direction);
        let b = 2.0 * oc.dot(ray.direction);
        let c = oc.dot(oc) - this.radius * this.radius;
        let dlt = b * b - 4 * a * c;
        if (dlt < 0) {
            return null;
        }
        // 射线起点在球外部时，肯定是取这个distance
        let distance = (-b - Math.sqrt(dlt)) / (2.0 * a);
        if (distance > minDistance && distance < maxDistance) {
            let info = new RaycastInfo();
            info.distance = distance;
            info.position = ray.GetPoint(info.distance);
            info.normal = info.position.sub(this.center).normalize();
            info.uv = this.getUV(info.position.sub(this.center).scale(1.0 / this.radius));
            info.material = this.material;
            info.isFront = true;
            return info;
        }
        // 射线起点在球内部时，才会取这个distance
        distance = (-b + Math.sqrt(dlt)) / (2.0 * a);
        if (distance > minDistance && distance < maxDistance) {
            let info = new RaycastInfo();
            info.distance = distance;
            info.position = ray.GetPoint(info.distance);
            // info.normal = info.position.sub(this.center).normalize();
            info.normal = this.center.sub(info.position).normalize();
            info.uv = this.getUV(info.position.sub(this.center).scale(1.0 / this.radius));
            info.material = this.material;
            info.isFront = false;
            return info;
        }
        return null;
    }

    private getUV(v: Vec3): Vec2 {
        let phi = Math.atan2(v.z, v.x);
        let theta = Math.asin(v.y);
        return new Vec2(
            1 - (phi + Math.PI) / (2 * Math.PI),
            (theta + Math.PI * 0.5) / Math.PI);
    }
}

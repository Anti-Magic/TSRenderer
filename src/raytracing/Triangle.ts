import { Geometry } from "./Geometry";
import { AABB } from "./AABB";
import { Ray } from "./Ray";
import { RaycastInfo } from "./RaycastInfo";
import { Material } from "./Material";
import { Vec3 } from "../math/Vec3";
import { Vec2 } from "../math/Vec2";
import { Vertex } from "../Vertex";

export class Triangle implements Geometry {
    public v0: Vertex;
    public v1: Vertex;
    public v2: Vertex;
    public material: Material;
    private aabb: AABB;

    public constructor(v0: Vertex, v1: Vertex, v2: Vertex, material: Material) {
        this.v0 = v0;
        this.v1 = v1;
        this.v2 = v2;
        this.material = material;

        let min = new Vec3(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
        let max = new Vec3(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
        [v0, v1, v2].forEach((v) => {
            min.x = Math.min(min.x, v.position.x);
            min.y = Math.min(min.y, v.position.y);
            min.z = Math.min(min.z, v.position.z);
            max.x = Math.max(max.x, v.position.x);
            max.y = Math.max(max.y, v.position.y);
            max.z = Math.max(max.z, v.position.z);
        });
        this.aabb = new AABB(min, max);
    }

    public getAABB(): AABB {
        return this.aabb;
    }

    // Determine whether a ray intersect with a triangle
    // Parameters
    // orig: origin of the ray
    // dir: direction of the ray
    // v0, v1, v2: vertices of triangle
    // t(out): weight of the intersection for the ray
    // u(out), v(out): barycentric coordinate of intersection
    public raycast(ray: Ray, minDistance: number, maxDistance: number): RaycastInfo {
        let v0 = new Vec3(this.v0.position.x, this.v0.position.y, this.v0.position.z);
        let v1 = new Vec3(this.v1.position.x, this.v1.position.y, this.v1.position.z);
        let v2 = new Vec3(this.v2.position.x, this.v2.position.y, this.v2.position.z);
        
        let E1 = v1.sub(v0);
        let E2 = v2.sub(v0);
        let P = ray.direction.cross(E2);
        let det = E1.dot(P);
        // keep det > 0, modify T accordingly
        let T: Vec3;
        if (det > 0) {
            T = ray.origin.sub(v0);
        }
        else {
            T = v0.sub(ray.origin);
            det = -det;
        }
        // If determinant is near zero, ray lies in plane of triangle
        if (det < 0.0001) {
            return null;
        }
        // Calculate u and make sure u <= 1
        let u = T.dot(P);
        if (u < 0.0 || u > det) {
            return null;
        }
        let Q = T.cross(E1);
        // Calculate v and make sure u + v <= 1
        let v = ray.direction.dot(Q);
        if (v < 0.0 || u + v > det) {
            return null;
        }

        // Calculate t, scale parameters, ray intersects triangle
        let t = E2.dot(Q);

        let fInvDet = 1.0 / det;
        t *= fInvDet;
        u *= fInvDet;
        v *= fInvDet;

        if (t <= minDistance || t >= maxDistance) {
            return null;
        }
        
        let normal = this.v0.normal.scale(1.0 - u - v).add(this.v1.normal.scale(u)).add(this.v2.normal.scale(v));
        let uv = this.v0.texcoord.scale(1.0 - u - v).add(this.v1.texcoord.scale(u)).add(this.v2.texcoord.scale(v));
        let hit = new RaycastInfo();
        hit.distance = t;
        hit.position = ray.GetPoint(t);
        hit.normal = new Vec3(normal.x, normal.y, normal.z);
        hit.material = this.material;
        hit.isFront = true;
        hit.uv = new Vec2(uv.x, uv.y);
        return hit;
    }
}

import { Geometry } from "./Geometry";
import { Ray } from "./Ray";
import { RaycastInfo } from "./RaycastInfo";
import { AABB } from "./AABB";
import { Vec3 } from "../math/Vec3";

export class BVHNode implements Geometry {
    public left: Geometry;
    public right: Geometry;
    private aabb: AABB;

    public setAABB(aabb: AABB) {
        this.aabb = aabb;
    }

    public getAABB(): AABB {
        return this.aabb;
    }

    public raycast(ray: Ray, minDistance: number, maxDistance: number): RaycastInfo {
        if (!this.getAABB().isRayHit(ray, minDistance, maxDistance)) {
            return null;
        }
        let result = null;
        let hitLeft = this.left.raycast(ray, minDistance, maxDistance);
        let hitRight = this.right != null ? this.right.raycast(ray, minDistance, maxDistance) : null;
        if (hitLeft != null && hitRight != null) {
            if (hitLeft.distance < hitRight.distance) {
                result = hitLeft;
            }
            else {
                result = hitRight;
            }
        }
        else if (hitLeft != null) {
            result = hitLeft;
        }
        else if (hitRight != null) {
            result = hitRight;
        }
        return result;
    }
}

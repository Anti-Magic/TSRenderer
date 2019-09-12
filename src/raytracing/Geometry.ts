import { Ray } from "./Ray";
import { RaycastInfo } from "./RaycastInfo";
import { AABB } from "./AABB";

export interface Geometry {
    getAABB(): AABB;
    raycast(ray: Ray, minDistance: number, maxDistance: number): RaycastInfo;
}

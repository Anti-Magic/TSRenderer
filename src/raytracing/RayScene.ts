import { Geometry } from "./Geometry";
import { Ray } from "./Ray";
import { RaycastInfo } from "./RaycastInfo";
import { BVHNode } from "./BVHNode";
import { AABB } from "./AABB";
import { Vec3 } from "../math/Vec3";

export class RayScene {
    private geometries: Geometry[];
    private bvhRoot: BVHNode;

    public constructor() {
        this.geometries = [];
    }

    public addGeometry(g: Geometry) {
        this.geometries.push(g);
    }

    // 光线追踪前的准备工作
    public prepareRaycast() {
        if (this.geometries.length > 0) {
            this.bvhRoot = this.buildBVHNode(this.geometries);
        }
        else {
            this.bvhRoot = null;
        }
    }

    public raycast(ray: Ray, minDistance: number, maxDistance: number): RaycastInfo {
        // let result = null;
        // let closest = maxDistance;
        // this.geometries.forEach(g => {
        //     let info = g.raycast(ray, minDistance, closest);
        //     if (info != null) {
        //         result = info;
        //         closest = info.distance;
        //     }
        // });
        // return result;
        if (this.bvhRoot != null) {
            return this.bvhRoot.raycast(ray, minDistance, maxDistance);
        }
        return null;
    }

    private buildBVHNode(geometries: Geometry[]): BVHNode {
        let node = new BVHNode();
        let aabb = this.calcAABB(geometries);
        node.setAABB(aabb);
        if (geometries.length == 1) {
            node.left = geometries[0];
            node.right = null;
        }
        else if (geometries.length == 2) {
            node.left = geometries[0];
            node.right = geometries[1];
        }
        else {
            // 按最长轴划分
            let xLen = aabb.max.x - aabb.min.x;
            let yLen = aabb.max.y - aabb.min.y;
            let zLen = aabb.max.z - aabb.min.z;
            if (xLen >= yLen && xLen >= zLen) {
                geometries.sort((a: Geometry, b: Geometry) => {
                    return a.getAABB().min.x - b.getAABB().min.x;
                });
            }
            else if (yLen >= xLen && yLen >= zLen) {
                geometries.sort((a: Geometry, b: Geometry) => {
                    return a.getAABB().min.y - b.getAABB().min.y;
                });
            }
            else {
                geometries.sort((a: Geometry, b: Geometry) => {
                    return a.getAABB().min.z - b.getAABB().min.z;
                });
            }
            node.left = this.buildBVHNode(geometries.slice(0, geometries.length / 2));
            node.right = this.buildBVHNode(geometries.slice(geometries.length / 2, geometries.length));
        }
        return node;
    }

    private calcAABB(geometries: Geometry[]): AABB {
        let min = new Vec3(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
        let max = new Vec3(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
        geometries.forEach((g) => {
            let aabb = g.getAABB();
            min.x = Math.min(min.x, aabb.min.x);
            min.y = Math.min(min.y, aabb.min.y);
            min.z = Math.min(min.z, aabb.min.z);
            max.x = Math.max(max.x, aabb.max.x);
            max.y = Math.max(max.y, aabb.max.y);
            max.z = Math.max(max.z, aabb.max.z);
        });
        return new AABB(min, max);
    }
}

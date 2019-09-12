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
import { Triangle } from "./Triangle";
import { Mesh } from "../Mesh";
import { BVHNode } from "./BVHNode";

export class RayMesh implements Geometry {
    public material: Material;
    public aabb: AABB;
    public triangles: Triangle[];
    public mesh: Mesh;
    private bvhRoot: BVHNode;

    public constructor(mesh: Mesh, material: Material) {
        this.mesh = mesh;
        this.material = material;
        this.triangles = [];
        let vertices = mesh.vertices;
        let indices = mesh.indices;
        if (indices != null) {
            for (let i = 0; i < indices.length; i += 3) {
                this.triangles.push(new Triangle(
                    vertices[indices[i]], 
                    vertices[indices[i+1]], 
                    vertices[indices[i+2]],
                    material));
            }
        }
        else {
            for (let i = 0; i < vertices.length; i += 3) {
                this.triangles.push(new Triangle(
                    vertices[i], 
                    vertices[i+1], 
                    vertices[i+2],
                    material));
            }
        }

        this.bvhRoot = this.buildBVHNode(this.triangles);
        this.aabb = this.bvhRoot.getAABB();
    }

    public getAABB(): AABB {
        return this.aabb;
    }

    public raycast(ray: Ray, minDistance: number, maxDistance: number): RaycastInfo {
        return this.bvhRoot.raycast(ray, minDistance, maxDistance);
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

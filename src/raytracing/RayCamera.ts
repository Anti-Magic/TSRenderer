import { Vec3 } from "../math/Vec3";
import { Ray } from "./Ray";
import { Utils } from "./Utils";

export class RayCamera {
    private origin: Vec3;
    private lowerLeftCorner: Vec3;
    private horizontal: Vec3;
    private vertical: Vec3;
    private front: Vec3;
    private right: Vec3;
    private up: Vec3;
    // 光圈半径，为0时表示理想化的小孔
    private apertureRadius: number;

    public constructor(lookfrom: Vec3, lookat: Vec3, up: Vec3, vfov: number, aspect: number, apertureRadius: number, focusDist: number) {
        this.origin = lookfrom;
        this.apertureRadius = apertureRadius;
        let theta = vfov * Math.PI / 180.0;
        let halfHeight = Math.tan(theta * 0.5);
        let halfWidth = halfHeight * aspect;
        this.front = lookat.sub(lookfrom).normalize();
        this.right = up.cross(this.front);
        this.up = this.front.cross(this.right);
        this.lowerLeftCorner = this.origin.add(this.right.scale(-halfWidth * focusDist)).add(this.up.scale(-halfHeight * focusDist)).add(this.front.scale(focusDist));
        this.horizontal = this.right.scale(2 * halfWidth * focusDist);
        this.vertical = this.up.scale(2 * halfHeight * focusDist);
    }

    public getRay(x: number, y: number): Ray {
        let rd = Utils.randomInUnitDisk().scale(this.apertureRadius);
        let offset = this.right.scale(rd.x).add(this.up.scale(rd.y));
        let origin = this.origin.add(offset);
        let direction = this.lowerLeftCorner.add(this.horizontal.scale(x)).add(this.vertical.scale(y)).sub(origin).normalize();
        return new Ray(origin, direction);
    }
}

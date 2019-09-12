import { Vec3 } from "../math/Vec3";

export class Ray {
    public origin : Vec3;
    public direction : Vec3;

    public constructor(o : Vec3, d : Vec3) {
        this.origin = o;
        this.direction = d.normalize();
    }

    public GetPoint(t : number) {
        return this.origin.add(this.direction.scale(t));
    }
}

import { Texture } from "../Texture";
import { Vec4 } from "../math/Vec4";

export class CheckerTexture2D extends Texture {
    private even: Vec4;
    private odd: Vec4;

    public constructor(even: Vec4, odd: Vec4) {
        super();
        this.even = even;
        this.odd = odd;
    }

    public getColor(pos: Vec4): Vec4 {
        let sines = Math.sin(10 * pos.x) * Math.sin(10 * pos.y) * Math.sin(10 * pos.z);
        if (sines < 0) {
            return this.odd;
        }
        else {
            return this.even;
        }
    }
}

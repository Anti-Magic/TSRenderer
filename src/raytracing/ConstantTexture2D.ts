import { Texture } from "../Texture";
import { Vec4 } from "../math/Vec4";

export class ConstantTexture2D extends Texture {
    private color: Vec4;

    public constructor(color: Vec4) {
        super();
        this.color = color;
    }

    public getColor(pos: Vec4): Vec4 {
        return this.color;
    }
}

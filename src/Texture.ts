import { Vec4 } from "./math/Vec4";
import { Mathf } from "./math/Mathf";

export abstract class Texture {
    public abstract getColor(pos: Vec4): Vec4;
}

export namespace Texture {
    export enum FilterMode {
        Point,
        Bilinear,
    }
}

import { Vec4 } from "./math/Vec4";

export class ShaderV2F {
    public position: Vec4 = new Vec4();
    public normal: Vec4 = new Vec4();
    public texcoord0: Vec4 = new Vec4();
    public texcoord1: Vec4 = new Vec4();
    public texcoord2: Vec4 = new Vec4();
    public texcoord3: Vec4 = new Vec4();

    public mul(x: number) {
        this.normal = this.normal.scale(x);
        this.texcoord0 = this.texcoord0.scale(x);
        this.texcoord1 = this.texcoord1.scale(x);
        this.texcoord2 = this.texcoord2.scale(x);
        this.texcoord3 = this.texcoord3.scale(x);
    }

    public fromLerp(a: ShaderV2F, b: ShaderV2F, t: number) {
        this.position.fromLerp(a.position, b.position, t);
        this.normal.fromLerp(a.normal, b.normal, t);
        this.texcoord0.fromLerp(a.texcoord0, b.texcoord0, t);
        this.texcoord1.fromLerp(a.texcoord1, b.texcoord1, t);
        this.texcoord2.fromLerp(a.texcoord2, b.texcoord2, t);
        this.texcoord3.fromLerp(a.texcoord3, b.texcoord3, t);
    }
}

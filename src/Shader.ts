import { Vec4 } from "./math/Vec4";
import { Vertex } from "./Vertex";
import { ShaderV2F } from "./ShaderV2F";
import { Mat4 } from "./math/Mat4";
import { Texture2D } from "./Texture2D";
import { Mathf } from "./math/Mathf";

export class Shader {
    public mvp: Mat4;
    public texture0: Texture2D;
    public texture1: Texture2D;

    public vert(v: Vertex): ShaderV2F {
        let o = new ShaderV2F();
        o.position = v.position.apply(this.mvp);
        o.normal = v.normal;
        o.texcoord0 = v.texcoord;
        return o;
    }

    public frag(f: ShaderV2F): Vec4 {
        // f.texcoord0.x = 0;
        // f.texcoord0.y = 0;
        // let uv = this.texture0.size.mul(f.texcoord0);
        // uv.x = Mathf.clamp(Math.floor(uv.x), 0, this.texture0.size.x - 1);
        // uv.y = Mathf.clamp(Math.floor(uv.y), 0, this.texture0.size.y - 1);
        let diffuse = this.texture0.getColor(f.texcoord0.x, f.texcoord0.y);
        return diffuse;
    }
}

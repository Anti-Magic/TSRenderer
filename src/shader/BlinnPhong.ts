import { Shader } from "../Shader";
import { Vec4 } from "../math/Vec4";
import { Vertex } from "../Vertex";
import { ShaderV2F } from "../ShaderV2F";
import { Mathf } from "../math/Mathf";

export class ShaderBlinnPhong extends Shader {
    public vert(v: Vertex): ShaderV2F {
        let o = new ShaderV2F();
        o.position = v.position.apply(this.mvp);
        o.normal = v.normal.apply(this.mNormal);
        o.texcoord0 = v.texcoord;
        o.texcoord1 = v.position.apply(this.mModel);
        return o;
    }

    public frag(f: ShaderV2F): Vec4 {
        let normal = f.normal.normalize();
        let worldPos = f.texcoord1;
        let lightDir = this.lighting.dir.normalize();
        let viewDir = this.posView.sub(worldPos).normalize();
        let halfDir = lightDir.add(viewDir).normalize();
        let diffColor = this.texture0.getColor(f.texcoord0.x, f.texcoord0.y);
        let specColor = this.texture1.getColor(f.texcoord0.x, f.texcoord0.y);
        let ambient = this.lighting.ambient.mul(diffColor);
        let diffuse = this.lighting.color.mul(diffColor).scale(normal.dot(lightDir));
        let specular = this.lighting.color.mul(specColor).scale(Math.pow(Mathf.clamp(normal.dot(halfDir)), this.gloss));
        let color = ambient.add(diffuse).add(specular);
        color.w = 1.0;
        return color;
    }
}

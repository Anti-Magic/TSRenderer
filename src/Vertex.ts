import { Vec4 } from "./math/Vec4";

export class Vertex {
    public position: Vec4;
    public normal: Vec4;
    public texcoord: Vec4;
    public tangent: Vec4;
    public bitangent: Vec4;
    public boneIndex: Vec4;
    public boneWeight: Vec4;
}

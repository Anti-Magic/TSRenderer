import { Mesh } from "./Mesh";
import { Vertex } from "./Vertex";
import { Vec4 } from "./math/Vec4";

export class MeshPrimitive {
    public static cube(): Mesh {
        let vertices = new Array<Vertex>();
        let rawData = [
            // Positions       // Normals     // Texture Coords
            // Back face
            -0.5, -0.5, -0.5, 0.0, 0.0, -1.0, 0.0, 0.0,
            0.5, 0.5, -0.5, 0.0, 0.0, -1.0, 1.0, 1.0,
            0.5, -0.5, -0.5, 0.0, 0.0, -1.0, 1.0, 0.0,
            0.5, 0.5, -0.5, 0.0, 0.0, -1.0, 1.0, 1.0,
            -0.5, -0.5, -0.5, 0.0, 0.0, -1.0, 0.0, 0.0,
            -0.5, 0.5, -0.5, 0.0, 0.0, -1.0, 0.0, 1.0,
            // Front face
            -0.5, -0.5, 0.5, 0.0, 0.0, 1.0, 0.0, 0.0,
            0.5, -0.5, 0.5, 0.0, 0.0, 1.0, 1.0, 0.0,
            0.5, 0.5, 0.5, 0.0, 0.0, 1.0, 1.0, 1.0,
            0.5, 0.5, 0.5, 0.0, 0.0, 1.0, 1.0, 1.0,
            -0.5, 0.5, 0.5, 0.0, 0.0, 1.0, 0.0, 1.0,
            -0.5, -0.5, 0.5, 0.0, 0.0, 1.0, 0.0, 0.0,
            // Left face
            -0.5, 0.5, 0.5, -1.0, 0.0, 0.0, 1.0, 0.0,
            -0.5, 0.5, -0.5, -1.0, 0.0, 0.0, 1.0, 1.0,
            -0.5, -0.5, -0.5, -1.0, 0.0, 0.0, 0.0, 1.0,
            -0.5, -0.5, -0.5, -1.0, 0.0, 0.0, 0.0, 1.0,
            -0.5, -0.5, 0.5, -1.0, 0.0, 0.0, 0.0, 0.0,
            -0.5, 0.5, 0.5, -1.0, 0.0, 0.0, 1.0, 0.0,
            // Right face
            0.5, 0.5, 0.5, 1.0, 0.0, 0.0, 1.0, 0.0,
            0.5, -0.5, -0.5, 1.0, 0.0, 0.0, 0.0, 1.0,
            0.5, 0.5, -0.5, 1.0, 0.0, 0.0, 1.0, 1.0,
            0.5, -0.5, -0.5, 1.0, 0.0, 0.0, 0.0, 1.0,
            0.5, 0.5, 0.5, 1.0, 0.0, 0.0, 1.0, 0.0,
            0.5, -0.5, 0.5, 1.0, 0.0, 0.0, 0.0, 0.0,
            // Bottom face
            -0.5, -0.5, -0.5, 0.0, -1.0, 0.0, 0.0, 1.0,
            0.5, -0.5, -0.5, 0.0, -1.0, 0.0, 1.0, 1.0,
            0.5, -0.5, 0.5, 0.0, -1.0, 0.0, 1.0, 0.0,
            0.5, -0.5, 0.5, 0.0, -1.0, 0.0, 1.0, 0.0,
            -0.5, -0.5, 0.5, 0.0, -1.0, 0.0, 0.0, 0.0,
            -0.5, -0.5, -0.5, 0.0, -1.0, 0.0, 0.0, 1.0,
            // Top face
            -0.5, 0.5, -0.5, 0.0, 1.0, 0.0, 0.0, 1.0,
            0.5, 0.5, 0.5, 0.0, 1.0, 0.0, 1.0, 0.0,
            0.5, 0.5, -0.5, 0.0, 1.0, 0.0, 1.0, 1.0,
            0.5, 0.5, 0.5, 0.0, 1.0, 0.0, 1.0, 0.0,
            -0.5, 0.5, -0.5, 0.0, 1.0, 0.0, 0.0, 1.0,
            -0.5, 0.5, 0.5, 0.0, 1.0, 0.0, 0.0, 0.0,
        ];
        for (let i = 0; i < rawData.length; i += 8) {
            let vertex = new Vertex();
            vertex.position = new Vec4(rawData[i], rawData[i+1], rawData[i+2], 1);
            vertex.normal = new Vec4(rawData[i+3], rawData[i+4], rawData[i+5], 0);
            vertex.texcoord = new Vec4(rawData[i+6], rawData[i+7]);
            vertices.push(vertex);
        }
        let mesh = new Mesh();
        mesh.vertices = vertices;
        return mesh;
    }

    public static quad(): Mesh {
        let vertices = new Array<Vertex>();
        let rawData = [
            // Positions     // Normals     // Texture Coords
            -0.5, 0.5, 0.0,  0.0, 0.0, 1.0, 0.0, 1.0,
            0.5, -0.5, 0.0,  0.0, 0.0, 1.0, 1.0, 0.0,
            0.5, 0.5, 0.0,   0.0, 0.0, 1.0, 1.0, 1.0,
            -0.5, 0.5, 0.0,  0.0, 0.0, 1.0, 0.0, 1.0,
            -0.5, -0.5, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0,
            0.5, -0.5, 0.0,  0.0, 0.0, 1.0, 1.0, 0.0, 
        ];
        for (let i = 0; i < rawData.length; i += 8) {
            let vertex = new Vertex();
            vertex.position = new Vec4(rawData[i], rawData[i+1], rawData[i+2], 1);
            vertex.normal = new Vec4(rawData[i+3], rawData[i+4], rawData[i+5], 0);
            vertex.texcoord = new Vec4(rawData[i+6], rawData[i+7]);
            vertices.push(vertex);
        }
        let mesh = new Mesh();
        mesh.vertices = vertices;
        return mesh;
    }
}

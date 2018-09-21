import { Vec4 } from "./math/Vec4";
import { FrameBuffer } from "./FrameBuffer";

export class Draw {
    public static drawLine(fbo: FrameBuffer, begin: Vec4, end: Vec4) : void {
        let dx = Math.floor(end.x) - Math.floor(begin.x);
        let dy = Math.floor(end.y) - Math.floor(begin.y);
        let ux = (dx >= 0) ? 1 : -1;
        let uy = (dy >= 0) ? 1 : -1;
        let x = Math.floor(begin.x);
        let y = Math.floor(begin.y);
        let endx = Math.floor(end.x);
        let endy = Math.floor(end.y);
        let eps = 0;
        dx = Math.abs(dx);
        dy = Math.abs(dy);
        if (dx > dy) {
            for (; x != endx; x += ux) {
                if (x >= 0 && x < fbo.size.x && y >= 0 && y < fbo.size.y) {
                    fbo.setColor(new Vec4(x, y), new Vec4(1, 0, 0, 1));
                }
                eps += dy;
                if ((eps << 1) >= dx) {
                    y += uy;
                    eps -= dx;
                }
            }
        }
        else {
            for (; y != endy; y += uy) {
                if (x >= 0 && x < fbo.size.x && y >= 0 && y < fbo.size.y) {
                    fbo.setColor(new Vec4(x, y), new Vec4(1, 0, 0, 1));
                }
                eps += dx;
                if ((eps << 1) >= dy) {
                    x += ux;
                    eps -= dy;
                }
            }
        }
    }

    public static drawTriangle(v0: Vec4, v1: Vec4, v2: Vec4) : void {
        
    }
}

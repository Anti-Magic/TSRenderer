import { Vec4 } from "./math/Vec4";
import { FrameBuffer } from "./FrameBuffer";
import { Mathf } from "./math/Mathf";


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

    public static drawTriangle(fbo: FrameBuffer, p1: Vec4, p2: Vec4, p3: Vec4): void {
        if(p1.y > p2.y) {
            let temp = p2;
            p2 = p1;
            p1 = temp;
        }

        if(p2.y > p3.y) {
            let temp = p2;
            p2 = p3;
            p3 = temp;
        }

        if(p1.y > p2.y) {
            let temp = p2;
            p2 = p1;
            p1 = temp;
        }

        let dp1p2 = p2.y - p1.y > 0 ? (p2.x - p1.x) / (p2.y - p1.y) : 0;
        let dp1p3 = p3.y - p1.y > 0 ? (p3.x - p1.x) / (p3.y - p1.y) : 0;
        let dp2p3 = p3.y - p2.y > 0 ? (p3.x - p2.x) / (p3.y - p2.y) : 0;
        if(dp1p2 == 0)
        {
            for (let y = p1.y >> 0; y <= p3.y >> 0; y++) {
                this.scanLine(fbo, y, p1, p3, p2, p3);
            }
        }
        else if(dp2p3 == 0) {
            for (let y = p1.y >> 0; y <= p2.y >> 0; y++) {
                this.scanLine(fbo, y, p1, p2, p1, p3);
            }
        }
        else if(dp1p2 > dp1p3) {
            for (let y = p1.y >> 0; y <= p3.y >> 0; y++) {
                if(y < p2.y) {
                    this.scanLine(fbo, y, p1, p3, p1, p2);
                }
                else {
                    this.scanLine(fbo, y, p1, p3, p2, p3);
                }
            }
        }
        else {
            for (let y = p1.y >> 0; y < p3.y >> 0; y++)
            {
                if(y < p2.y) {
                    this.scanLine(fbo, y, p1, p2, p1, p3);
                }
                else{
                    this.scanLine(fbo, y , p2, p3, p1, p3);
                }
            }
        }
    }

    private static scanLine(fbo: FrameBuffer, y: number, pa: Vec4, pb: Vec4, pc: Vec4, pd: Vec4): void {
        let gradient1 = pa.y != pb.y ? (y - pa.y) / (pb.y - pa.y) : 1;
        let gradient2 = pc.y != pd.y ? (y - pc.y) / (pd.y - pc.y) : 1;
        let sx = Mathf.interpolate(pa.x, pb.x, gradient1) >> 0;
        let ex = Mathf.interpolate(pc.x, pd.x, gradient2) >> 0;
        for (let x = sx; x < ex; x++) {
            fbo.setColor(new Vec4(x, y, 0, 0), new Vec4(1, 0, 0, 1));
        }
    }
}

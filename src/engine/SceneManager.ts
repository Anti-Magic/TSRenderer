import { Scene } from "./Scene";

export class SceneManager {
    public scene: Scene;

    public constructor() {
        this.scene = null;
    }

    public changeScene(scene: Scene) {
        if (this.scene != null) {
            this.scene.stop();
        }
        this.scene = scene;
        this.scene.start();
    }

    public update(dt: number) {
        if (this.scene != null) {
            this.scene.update(dt);
        }
    }
}

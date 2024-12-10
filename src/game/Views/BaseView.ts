import { Scene, GameObjects } from "phaser";

export default class BaseView extends Phaser.GameObjects.Container {
    public scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        super(scene);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
    }

    public updateContainerSize(width: number, height: number): void {
        this.setSize(width, height);
        const body = this.body as Phaser.Physics.Arcade.Body;
        if (body) {
            body.setSize(width, height);
        }
    }

    public setViewPosition(x: number, y: number): void {
        this.setPosition(x, y);
    }
}

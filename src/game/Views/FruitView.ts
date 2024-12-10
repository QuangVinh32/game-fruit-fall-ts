import BaseView from "./BaseView";
import FruitDTO from "../DTOs/FruitDTO";
import FruitTypeDTO from "../DTOs/FruitTypeDTO";

export default class FruitView extends BaseView {
    public fruitData: FruitDTO;
    private fruitType: FruitTypeDTO;
    private fruit: Phaser.Physics.Arcade.Sprite;

    constructor(scene: Phaser.Scene, fruitData: FruitDTO, fruitType: FruitTypeDTO) {
        super(scene);
        this.fruitData = fruitData;
        this.fruitType = fruitType;
        this.createFruit();
        this.updateContainerSize(fruitData.width, fruitData.height);
        this.setViewPosition(fruitData.positionX, fruitData.positionY);
    }

    private createFruit(): void {
        this.fruit = this.scene.physics.add.sprite(
            0,
            0,
            this.fruitType.texture
        )
        .setDisplaySize(this.fruitData.width, this.fruitData.height)
        .setOrigin(0.5, 0.5);

        this.add(this.fruit);
    }
}

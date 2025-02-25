import { BaseView } from "mct-common";
import PlayerDTO from "../DTOs/PlayerDTO";

export default class PlayerView extends BaseView {
    public playerData: PlayerDTO;
    private player: Phaser.Physics.Arcade.Sprite;
    private shadow: Phaser.GameObjects.Sprite;

    constructor(scene: Phaser.Scene, playerData: PlayerDTO) {
        super(scene);
        this.playerData = playerData;
        this.createPlayer();
        this.createShadow();
        this.setViewPosition(playerData.positionX, playerData.positionY);
        this.updateContainerSize(playerData.width, playerData.height)
    }

    private createPlayer(): void {
        this.player = this.scene.physics.add.sprite(
            0,
            0,
            this.playerData.texture
        )
        .setDisplaySize(this.playerData.width, this.playerData.height)
        .setOrigin(0.5, 0.5)
        .setBounce(this.playerData.bounce);

        this.add(this.player);
    }

    private createShadow(): void {
        this.shadow = this.scene.add.sprite(
            0, 
            this.playerData.height / 2 + 45, 
            'shadow' 
        );
        this.shadow.setDisplaySize(this.playerData.width, 90);
        this.shadow.setOrigin(0.5, 0.5);
        this.add(this.shadow);
    }
}

import { Scene, GameObjects } from "phaser";
import PlayerDTO from "../DTOs/PlayerDTO";

export default class PlayerView extends Phaser.GameObjects.Container {
    public scene: Phaser.Scene;
    public playerData: PlayerDTO;
    private player: Phaser.Physics.Arcade.Sprite;
    private shadow: Phaser.GameObjects.Sprite;

    constructor(scene: Phaser.Scene, playerData: PlayerDTO) {
        super(scene);
        this.scene = scene;
        this.playerData = playerData;

        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.createPlayer();
        this.updateContainerSize();
        this.createShadow(); 

        this.setPosition(playerData.positionX, playerData.positionY);   
    }

    createPlayer() {
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
    
    createShadow() {
        this.shadow = this.scene.add.sprite(
            0, 
            this.playerData.height / 2 + 45, 
            'shadow' 
        );
        this.shadow.setDisplaySize(this.playerData.width, 90); 
        this.shadow.setOrigin(0.5, 0.5); 
        this.add(this.shadow); 
    }

    updateContainerSize() {
        this.setSize(this.player.displayWidth, this.player.displayHeight);
        const body = this.body as Phaser.Physics.Arcade.Body;
        if (body) {
            body.setSize(this.player.displayWidth, this.player.displayHeight);
        }
    }
}

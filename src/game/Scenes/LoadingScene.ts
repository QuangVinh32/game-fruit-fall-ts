export default class LoadingScene extends Phaser.Scene {
    constructor() {
        super("LoadingScene");
    }

    preload() {
        this.load.spritesheet('fruitFall', 'assets/Images/loader_spritesheet_1.png', {
            frameWidth: 64,  
            frameHeight: 64,
            endFrame: 9
        });
    }
    
    create() {
        const titleText = this.add.text(this.scale.width / 2 - 5, this.scale.height / 2 - 80, 'Fruit Fall', {
            fontSize: '30px Arial',
            fontStyle: "bold",
            color: 'black'
        }).setOrigin(0.5).setResolution(2);

        const loadingText = this.add.text(this.scale.width / 2 , this.scale.height / 2 + 60, 'LOADING', {
            fontSize: '15px Arial', 
            color: 'black'
        }).setOrigin(0.5).setResolution(2);

        this.anims.create({
            key: 'falling',     
            frames: this.anims.generateFrameNumbers('fruitFall', { start: 0, end: 9 }),
            frameRate: 10,        
            repeat: -1         
        });

        const fruit = this.add.sprite(this.scale.width / 2, this.scale.height / 2, 'fruitFall');
        fruit.play('falling');

        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('LevelScene');
            this.scene.launch('GamePlayScene');
        });

        this.cameras.main.fadeOut(1000); 
    }

    update() {
    }
}

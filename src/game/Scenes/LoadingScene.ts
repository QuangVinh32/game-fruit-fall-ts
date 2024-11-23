
export default class LoadingScene extends Phaser.Scene {
    constructor() {
        super("LoadingScene");
    }
    preload() {
        this.load.image("loader", "assets/Images/loader.gif");
    }
    async create() {

        const titleText = this.add.text(-60, -80, 'Fruit Fall', { fontSize: '30px Arial', fontStyle:"bold", color: 'black' });
        const loaderImage = this.add.image(0, 0, 'loader')
            .setDisplaySize(80, 80)
            .setOrigin(0.5, 0.5);  
        const loadingText = this.add.text(-33, 50, 'LOADING', { fontSize: '15px Arial', color: 'black' });

        const loadingContainer = this.add.container(0, 0, [titleText, loaderImage, loadingText]);

        loadingContainer.setPosition(this.scale.width / 2, this.scale.height / 2);
        
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start("LevelScene");
            this.scene.launch("PlayGameScene");
            // this.scene.start("ResultScene");

    
        });
  
        this.cameras.main.fadeOut(1000);
    }

    update() {

    }
}

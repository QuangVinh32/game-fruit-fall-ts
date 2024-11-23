export default class UIScene extends Phaser.Scene {
    private scoreText: Phaser.GameObjects.Text;
    private scoreCount: number = 0;


    constructor() {
        super("UIScene");
    }

    preload() {}

    create() {
        this.scoreText = this.add.text(10, 20, 'Score: 0', { fontSize: '18px Arial',fontStyle:"bold",color: 'black' });
    }
    updateLaunchCount(newScore: number) {
        this.scoreCount = newScore;
        this.scoreText.setText(`Score: ${this.scoreCount}`); 
    }
    

    update() {}
}

export default class UIScene extends Phaser.Scene {
    private scoreText: Phaser.GameObjects.Text;
    private scoreCount: number = 0;
    constructor() {
        super("UIScene");
    }

    init(data: { score: number }) {
        if (data && typeof data.score === "number") {
            this.scoreCount = data.score;
        }
    }

    preload() {}

    create(data: { newScore: number }) {
        this.scoreCount = data.newScore || 0;

        this.scoreText = this.add.text(10, 20, `Score: ${this.scoreCount}`, { 
            fontSize: '20px Arial', 
            fontStyle: "bold", 
            color: 'black' 
        });
    } 

    updateLaunchCount(newScore: number) {
        this.scoreCount = newScore;
        this.scoreText.setText(`Score: ${this.scoreCount}`);
    }
    
    updateScore(newScore: number) {
        this.scoreCount = newScore;
        this.scoreText.setText(`Score: ${this.scoreCount}`);
    }

    update() {}
}

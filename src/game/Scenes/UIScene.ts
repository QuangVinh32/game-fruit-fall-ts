export default class UIScene extends Phaser.Scene {
    private scoreText: Phaser.GameObjects.Text;
    private scoreCount: number = 0;
    private levelId: number;

    private readonly SCORE_TEXT_X_POSITION = 10;
    private readonly SCORE_TEXT_Y_POSITION = 20;
    private readonly SCORE_FONT_SIZE = '20px Arial';

    constructor() {
        super("UIScene");
    }

    init(data: { score: number }) {
        if (data && typeof data.score === "number") {
            this.scoreCount = data.score;
        }
        if (this.levelId === 1) {
            this.scoreCount = 0;
        }
    }

    preload() {}

    create(data: { newScore: number }) {
        this.scoreCount = data.newScore || 0;

        this.scoreText = this.add.text(
            this.SCORE_TEXT_X_POSITION, 
            this.SCORE_TEXT_Y_POSITION, 
            `Score: ${this.scoreCount}`, { 
            fontSize: this.SCORE_FONT_SIZE, 
            fontStyle: "bold", 
            color: 'black' 
        }).setResolution(2);
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

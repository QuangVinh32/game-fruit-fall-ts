import QuestionService from "../Services/QuestionService";

export default class PlayGameScene extends Phaser.Scene {
    private buttonSound: Phaser.Sound.BaseSound | null = null;
    private questionService: any;
    public levelId: number;
    private score: number;
    private isUISceneLaunched: boolean = false; 

    constructor() {
        super("PlayGameScene");
        this.levelId = 1;
    }

    init(data: {levelId: number,score: number}) {
        this.levelId = data.levelId;
        this.score = data.score
        // console.log("score in Play",data.score)
    }

    preload() {
        this.load.image("button", "assets/Images/button.png");
        this.load.audio("sound_initial","assets/Audio/sound_initial.mp3")
    }

    create() {
        this.buttonSound = this.sound.add("sound_initial", {
            volume: 1,
        });
    
        const levelMessages = [
            { main: "Help the farmer catch the apples.", sub: 'Select "Start" to continue' },
            { main: "Great job! Now catch pears.", sub: 'Select "Start" to continue' },
            { main: "Great job! Now catch oranges.", sub: 'Select "Start" to continue' },
            { main: "Great job! Now catch lemons.", sub: 'Select "Start" to continue' },
            { main: "Great job! Now catch limes.", sub: 'Select "Start" to continue' },
            { main: "Great job! Now catch peaches.", sub: 'Select "Start" to continue' },
        ];
    
        const levelIndex = Math.max(0, Math.min(this.levelId - 1, levelMessages.length - 1));
        const { main, sub } = levelMessages[levelIndex] || { 
            main: "Help the farmer catch the apples.", 
            sub: 'Select "Start" to continue' 
        };
        
    
        this.add.text(this.scale.width / 2, 410, main, {
            fontSize: "25px Arial",
            fontStyle: "bold",
            color: "black",
        }).setOrigin(0.5, 0); // Căn giữa ngang
        
        this.add.text(this.scale.width / 2, 440, sub, {
            fontSize: "15px Arial",
            color: "black",
        }).setOrigin(0.5, 0); // Căn giữa ngang
        
    
        let buttonStart = this.add.image(350, 300, "button")
            .setDisplaySize(150, 150)
            .setOrigin(0.5, 0.5)
            .setInteractive();
    
        let startText = this.add.text(0, 0, "Start", {
            fontSize: "33px Arial",
            fontStyle: "bold",
            color: "black",
        });
    
        startText.setOrigin(0.5, 0.5);
        startText.setPosition(buttonStart.x, buttonStart.y);
    
        buttonStart.on("pointerup", () => {
            if (!this.isUISceneLaunched) {
                this.scene.launch("UIScene", { score: this.score });
                this.isUISceneLaunched = true;
                if (this.buttonSound) {
                    this.buttonSound.play();
                }
            }
            this.scene.get("LevelScene").events.emit("enablePlayerMove");
            this.scene.get("LevelScene").events.emit("startFruitFall");
            this.scene.stop("PlayGameScene");
        });
    }
}
    
import QuestionService from "../Service/QuestionService";

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

    async create() {
        this.buttonSound = this.sound.add("sound_initial", {
            volume: 1,
        });

    switch (this.levelId) {
        case 1:
            this.add.text(190, 410, "Help the farmer catch the apples.", {
                fontSize: "25px Arial",
                fontStyle: "bold",
                color: "black",
            });
            this.add.text(270, 440, 'Select "Start" to continue', {
                fontSize: "15px Arial",
                color: "black",
            });
            break;

        case 2:
            this.add.text(190, 410, "Great job! Now catch pears.", {
                fontSize: "25px Arial",
                fontStyle: "bold",
                color: "black",
            });
            this.add.text(270, 440, 'Select "Start" to continue', {
                fontSize: "15px Arial",
                color: "black",
            });
            break;

        case 3:
            this.add.text(180, 410, "Great job! Now catch orranges.", {
                fontSize: "25px Arial",
                fontStyle: "bold",
                color: "black",
            });
            this.add.text(270, 440, 'Select "Start" to continue', {
                fontSize: "15px Arial",
                color: "black",
            });
            break;
        case 4:
            this.add.text(190, 410, "Great job! Now catch lemons.", {
                fontSize: "25px Arial",
                fontStyle: "bold",
                color: "black",
            });
            this.add.text(270, 440, 'Select "Start" to continue', {
                fontSize: "15px Arial",
                color: "black",
            });
            break;


        default:
            this.add.text(160, 410, "Help the farmer catch the apples.", {
                fontSize: "25px Arial",
                fontStyle: "bold",
                color: "black",
            });
            this.add.text(270, 440, 'Select "Start" to continue', {
                fontSize: "15px Arial",
                color: "black",
            });
            break;
        }
    
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
            // console.log("Start button clicked");
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
    


    update() {}



}
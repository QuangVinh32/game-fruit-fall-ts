import FruitService from "../Services/FruitService";
import QuestionService from "../Services/QuestionService";

export default class PlayGameScene extends Phaser.Scene {
    private buttonSound: Phaser.Sound.BaseSound | null = null;
    private questionService: any;
    public levelId: number;
    private score: number;
    private isUISceneLaunched: boolean = false; 
    private fruitService: FruitService | null ;

    constructor() {
        super("GamePlayScene");
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

        // const levelIds = this.fruitService?.getUniqueLevelIds() || [];
        // const cols = levelIds.length; 
        // console.log(`Cols (Number of unique levels) = ${cols}`);

    
        const levelMessages = [
            { main: "Help the farmer catch the apples.", sub: 'Select "Start" to continue' },
            { main: "Great job! Now catch pears.", sub: 'Select "Start" to continue' },
            { main: "Great job! Now catch oranges.", sub: 'Select "Start" to continue' },
            { main: "Great job! Now catch lemons.", sub: 'Select "Start" to continue' },
            { main: "Great job! Now catch limes.", sub: 'Select "Start" to continue' },
            { main: "Great job! Now catch peaches.", sub: 'Select "Start" to continue' },
            { main: "Great job! Now catch cherries.", sub: 'Select "Start" to continue' },
            { main: "Great job! Now catch mangoes.", sub: 'Select "Start" to continue' },
            { main: "Great job! Now catch kiwis.", sub: 'Select "Start" to continue' },
            { main: "Great job! Now catch stars.", sub: 'Select "Start" to continue' },
        ];
    
        const levelIndex = Math.max(0, Math.min(this.levelId - 1, levelMessages.length - 1));
        const { main, sub } = levelMessages[levelIndex] || { 
            main: "Help the farmer catch the apples.", 
            sub: 'Select "Start" to continue' 
        };

        const UI_PERCENT = {
            MAIN_TEXT_Y: 0.65,
            SUB_TEXT_Y: 0.7,
            BUTTON_X: 0.5,
            BUTTON_Y: 0.75,
            BUTTON_SCALE: 0.2
        };
        
        this.add.text(
            this.scale.width * UI_PERCENT.BUTTON_X,
            this.scale.height * UI_PERCENT.MAIN_TEXT_Y,
             main, {
            fontSize: "25px Arial",
            fontStyle: "bold",
            color: "black",
        }).setOrigin(0.5, 0).setResolution(2); 
        
        this.add.text(
            this.scale.width * UI_PERCENT.BUTTON_X,
            this.scale.height * UI_PERCENT.SUB_TEXT_Y, 
            sub, {
            fontSize: "15px Arial",
            color: "black",
        }).setOrigin(0.5, 0).setResolution(2);
        
        let buttonStart = this.add.image(0, 0, "button").setDisplaySize(
            this.scale.width * UI_PERCENT.BUTTON_SCALE, 
            this.scale.width * UI_PERCENT.BUTTON_SCALE
            );

        let startText = this.add.text(0, 0, "Start", {
            fontSize: "33px Arial",
            fontStyle: "bold",
            color: "black",
        }).setOrigin(0.5, 0.5).setResolution(2);
    
        let buttonContainer = this.add.container(
            this.scale.width / 2,
            this.scale.height / 2, 
            [buttonStart, startText]);
    
        buttonContainer.setSize(
            this.scale.width * UI_PERCENT.BUTTON_SCALE, 
            this.scale.width * UI_PERCENT.BUTTON_SCALE
            ).setInteractive();
    
        buttonContainer.on("pointerup", () => {
            if (this.buttonSound) {
                this.buttonSound.play();
            }
    
            this.tweens.add({
                targets: buttonContainer,
                scale: { from: 1, to: 1.1 }, 
                duration: 300,
                yoyo: true,                 
                ease: "Sine.easeInOut",    
                onComplete: () => {
                    if (!this.isUISceneLaunched) {
                        this.scene.launch("UIScene", { score: this.score , levelId: this.levelId});
                        this.isUISceneLaunched = true;
                    }

                    // if (this.levelId >= cols) {
                    //     this.levelId = 1; 

                    // } else {
                    //     this.levelId += 1; 
                    // }

                    this.scene.get("LevelScene").events.emit("enablePlayerMove");
                    this.scene.get("LevelScene").events.emit("startFruitFall");
                    this.scene.stop("GamePlayScene");
                },
            });
        });
    }
    
    
}
    
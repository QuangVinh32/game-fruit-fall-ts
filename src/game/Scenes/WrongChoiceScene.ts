import FruitService from "../Service/FruitService";
import OptionService from "../Service/OptionService";
import QuestionService from "../Service/QuestionService";

export default class WrongChoiceScene extends Phaser.Scene{
    private fruitService: FruitService | null = null;
    private questionService: QuestionService | null = null;
    private optionService: OptionService | null = null;
    private levelId: number;
    private fruitId: number;
    private questionId: number;
    private fruitsCaught: Map<number, { levelId: number, fruitId: number }[]> = new Map();
    private validFruitsCount: number;
    private buttonSound: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
    private score: number;

    constructor(){
        super("WrongChoiceScene")
    }

    init(data: { levelId: number, score: number, validFruitsCount: number,fruitsCaughtMatrix: { [key: number]: { levelId: number, fruitId: number }[] } }) {
        this.levelId = data.levelId;
        this.score = data.score;
        console.log(data.score);

        this.fruitsCaught = new Map(Object.entries(data.fruitsCaughtMatrix).map(([key, value]) => [parseInt(key), value]));

        this.validFruitsCount = this.fruitsCaught.get(this.levelId)?.filter(fruit => fruit.fruitId !== 0).length || 0;
    
        // data.fruitsCaught.forEach(fruitGroup => {
        //     if (!this.fruitsCaught.has(fruitGroup.levelId)) {
        //         this.fruitsCaught.set(fruitGroup.levelId, []);
        //     }
        //     this.fruitsCaught.get(fruitGroup.levelId)!.push(...fruitGroup.fruits);
        // });
    
        // console.log('Fruits caught (grouped by level):', this.fruitsCaught);
        // console.log("Số lượng trái cây hợp lệ:", this.validFruitsCount);
        // console.log("Số lượng đúng:", this.currentCount);
    }
    
    preaload(){

    }
    create(){
        this.buttonSound = this.sound.add("sound_initial", {
            volume: 1,
        });

        const fruitCountPerLevel: Map<number, number> = new Map();

        this.fruitsCaught.forEach((fruits, levelId) => {
            const count = fruits.filter(fruitData => fruitData.fruitId !== 0).length;
            fruitCountPerLevel.set(levelId, count);
        });

        fruitCountPerLevel.forEach((count, levelId) => {
            console.log(`Level ${levelId}: Số lượng fruitId khác 0 là ${count}`);
        });

        this.add.text(240, 410, "Sorry, The answer is", { fontSize: '20px Arial', fontStyle: "bold", color: 'black' })
        this.add.text(440, 410, this.validFruitsCount.toString(), { fontSize: '20px Arial', fontStyle: "bold", color: 'black' })
        this.add.text(230, 440, "Try agian, Select 'Start' to continue.", { fontSize: '15px Arial', color: 'black' })

        let buttonStart = this.add.image(350, 530, 'button')
        .setDisplaySize(120, 120)
        .setOrigin(0.5, 0.5)
        .setInteractive();
        let startText = this.add.text(0, 0, 'Start', { fontSize: '25px Arial', fontStyle: 'bold', color: 'black' });
        startText.setOrigin(0.5, 0.5);
        startText.setPosition(buttonStart.x, buttonStart.y);

        buttonStart.on('pointerdown', () => {
            console.log("Quay lại màn chơi")
            if (this.buttonSound) {
                this.buttonSound.play();
            }
            const currentLevelFruits = this.fruitsCaught.get(this.levelId);
            if (currentLevelFruits) {
                currentLevelFruits.length = 0; 
            }
            console.log('Fruits caught for the current level cleared:', this.fruitsCaught);

            this.validFruitsCount = 0;
            console.log("Level before:", this.levelId);
            this.scene.start('LevelScene', {
                levelId: this.levelId,
                fruitsCaught: Array.from(this.fruitsCaught.get(this.levelId) || []),
            });
            this.scene.stop("QuestionAndOptionScene");
            this.scene.stop("ResultScene")
            this.scene.start("PlayGameScene")
        });
        // Khi quay lại màn chơi trừ đi số fruitId != 0;
        // Khi quay lại màn chơi xóa mảng có levelId vừa đạt được


        

    }
    update(){

    }
}
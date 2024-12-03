import OptionDTO from "../DTOs/OptionDTO";
import FruitService from "../Services/FruitService";
import OptionService from "../Services/OptionService";
import QuestionService from "../Services/QuestionService";
import OptionView from "../Views/OptionView";
import QuestionView from "../Views/QuestionView";

export default class QuestionAndOptionScene extends Phaser.Scene {
    private buttonSound: Phaser.Sound.BaseSound | null = null;
    private fruitService: FruitService | null = null;
    private questionService: QuestionService | null = null;
    private optionService: OptionService | null = null;
    private levelId: number;
    private score: number;
    private validFruitsCount: number;
    private fruitsCaught: Map<number, { levelId: number, fruitId: number }[]> = new Map();
    public buttonOption: Phaser.GameObjects.Image; 
    public successSount: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
    public failureSount: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;


    constructor() {
        super("QuestionAndOptionScene");
    }

    init(data: { score: number, levelId: number, fruitsCaughtMatrix: { [key: number]: { levelId: number, fruitId: number }[] } }) {
        this.levelId = data.levelId;
        this.score = data.score;
        // console.log("levelId in Question :",data.levelId);
        this.fruitsCaught = new Map(Object.entries(data.fruitsCaughtMatrix).map(([key, value]) => [parseInt(key), value]));
        this.validFruitsCount = this.fruitsCaught.get(this.levelId)?.filter(fruit => fruit.fruitId !== 0).length || 0;
        // console.log("Fruits caught matrix:", this.fruitsCaught);
        // console.log(`Valid fruits count for level ${this.levelId}:`, this.validFruitsCount);
    }

    preload() { 
        this.load.audio("sound_success", "assets/Audio/sound_success.mp3");
        this.load.audio("sound_failure", "assets/Audio/sound_failure.mp3");
    }

    async create() {
        this.successSount = this.sound.add("sound_success", {
            volume: 3,
        });
        this.failureSount = this.sound.add("sound_failure", {
            volume: 3,
        });
        const fruitCountPerLevel: Map<number, number> = new Map();

        this.fruitsCaught.forEach((fruits, levelId) => {
            const count = fruits.filter(fruitData => fruitData.fruitId !== 0).length;
            fruitCountPerLevel.set(levelId, count);
        });

        fruitCountPerLevel.forEach((count, levelId) => {
            // console.log(`Level ${levelId}: Valid fruits caught = ${count}`);
        });

        this.buttonSound = this.sound.add("sound_initial", {
            volume: 1,
        });

        this.add.text(180, 450, "Use the picture graph above to find the correct amount.", { fontSize: '15px Arial', color: 'black' });

        this.questionService = new QuestionService(this,"assets/Data/question.json");
        await this.questionService.initialize(this.levelId);

        this.fruitService = new FruitService(this, "assets/Data/fruit.json");
        await this.fruitService.initializeNoView();

        const fruitsAtLevel = this.fruitService.getFruitsByLevelId(this.levelId);
        // console.log("fruitAtLevel",fruitsAtLevel)
        const fruitCount = fruitsAtLevel.length
        // console.log(`Level ${this.levelId}: FruitCount = ${fruitCount}`);

        // const maxFruits = 6;
        const options = [];
        
        options.push(this.validFruitsCount);
        
        while (options.length < 4) {
            const randomValue = Phaser.Math.Between(0, fruitCount);
            if (!options.includes(randomValue)) {
                options.push(randomValue);
            }
        }
            Phaser.Utils.Array.Shuffle(options);
            
            options.forEach((value, index) => {
                const x = 120 + index * 160; 
                const y = 535;             
                const width = 120;           
                const height = 120;          
                const isAnswer = value === this.validFruitsCount; 
            
                const optionDTO = new OptionDTO(
                    index,        
                    isAnswer,    
                    value,        
                    this.levelId, 
                    x,            
                    y,            
                    width,        
                    height       
                );
            
                const optionView = new OptionView(this, optionDTO);
                optionView.setPosition(x, y);
                this.add.existing(optionView);
            
                optionView.buttonOption.on("pointerup", () => {
                    this.checkAnswer(this.validFruitsCount, optionDTO);
                });
            });
    }

    checkAnswer(currentCount: number, optionDTO: OptionDTO): void {
        if (currentCount === optionDTO.value) {
            // console.log("Đúng!");
            if (this.successSount) {
                this.successSount.play();
            }
            this.levelId += 1;

            // console.log("Chuyển sang LevelScene với levelId:", this.levelId);
            this.scene.start('LevelScene', {
                levelId: this.levelId,
                fruitsCaughtMatrix: Object.fromEntries(this.fruitsCaught), 
            });  
            this.scene.start("PlayGameScene",{
                levelId: this.levelId,
                score: this.score
            });
            this.scene.stop('QuestionAndOptionScene');
            this.scene.stop('ResultScene');

        } else {
            // console.log("Sai!");
              if (this.failureSount) {
                this.failureSount.play();
            }
            const newScore = this.score - this.validFruitsCount;

            this.scene.launch("UIScene", { newScore: newScore });
            this.scene.stop("QuestionAndOptionScene");
            this.scene.launch("WrongChoiceScene", {
                levelId: this.levelId,
                score: newScore,
                fruitsCaughtMatrix: Object.fromEntries(this.fruitsCaught), 
                validFruitsCount: this.validFruitsCount,
                currentCount: currentCount,
            });
        }
    }

    update() {
    }
}

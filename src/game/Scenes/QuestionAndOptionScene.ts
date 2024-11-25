import OptionDTO from "../DTOs/OptionDTO";
import FruitService from "../Service/FruitService";
import OptionService from "../Service/OptionService";
import QuestionService from "../Service/QuestionService";
import OptionView from "../View/OptionView";

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


    constructor() {
        super("QuestionAndOptionScene");
    }

    init(data: { score: number, levelId: number, fruitsCaughtMatrix: { [key: number]: { levelId: number, fruitId: number }[] } }) {
        this.levelId = data.levelId;
        this.score = data.score;
        console.log(data.score);

        this.fruitsCaught = new Map(Object.entries(data.fruitsCaughtMatrix).map(([key, value]) => [parseInt(key), value]));

        this.validFruitsCount = this.fruitsCaught.get(this.levelId)?.filter(fruit => fruit.fruitId !== 0).length || 0;

        console.log("Fruits caught matrix:", this.fruitsCaught);
        console.log(`Valid fruits count for level ${this.levelId}:`, this.validFruitsCount);
    }

    preload() { }

    async create() {
        const fruitCountPerLevel: Map<number, number> = new Map();

        this.fruitsCaught.forEach((fruits, levelId) => {
            const count = fruits.filter(fruitData => fruitData.fruitId !== 0).length;
            fruitCountPerLevel.set(levelId, count);
        });

        fruitCountPerLevel.forEach((count, levelId) => {
            console.log(`Level ${levelId}: Valid fruits caught = ${count}`);
        });

        this.buttonSound = this.sound.add("sound_initial", {
            volume: 1,
        });

        this.add.text(180, 450, "Use the picture graph above to find the correct amount.", { fontSize: '15px Arial', color: 'black' });

        this.questionService = new QuestionService(this, "assets/Data/question.json");
        await this.questionService.initialize(this.levelId);

        const questionDTO = this.questionService.getQuestionDTOById(this.levelId);

        if (questionDTO && questionDTO.questionId !== undefined) {
            const questionId = questionDTO.questionId;

            this.optionService = new OptionService(this, "assets/Data/option.json");
            await this.optionService.initialize(questionId);

            const optionDTOs = this.optionService.getAllOptionDTOs1(questionId);
            const currentCount = fruitCountPerLevel.get(this.levelId) || 0;

            optionDTOs.forEach((optionDTO) => {
                const optionView = new OptionView(this, optionDTO);
                this.add.existing(optionView);
                optionView.buttonOption.on('pointerdown', () => {
                    this.checkAnswer(currentCount, optionDTO);
                });
            });
        } else {
            console.error("Không thể lấy questionDTO hoặc questionId không hợp lệ");
        }
    }

    checkAnswer(currentCount: number, optionDTO: OptionDTO): void {
        if (currentCount === optionDTO.value) {
            console.log("Đúng!");
            this.levelId += 1;

            console.log("Chuyển sang LevelScene với levelId:", this.levelId);
            this.scene.start('LevelScene', {
                levelId: this.levelId,
                fruitsCaughtMatrix: Object.fromEntries(this.fruitsCaught), 
            });
            this.scene.stop('QuestionAndOptionScene');
            this.scene.stop('ResultScene');
        } else {
            console.log("Sai!");
            this.scene.stop("QuestionAndOptionScene");
            this.scene.launch("WrongChoiceScene", {
                levelId: this.levelId,
                score: this.score,
                fruitsCaughtMatrix: Object.fromEntries(this.fruitsCaught), 
                validFruitsCount: this.validFruitsCount,
                currentCount: currentCount,
            });
        }
    }

    update() {
    }
}

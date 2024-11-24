import OptionDTO from "../DTOs/OptionDTO";
import FruitService from "../Service/FruitService";
import OptionService from "../Service/OptionService";
import QuestionService from "../Service/QuestionService";
import OptionView from "../View/OptionView";


export default class QuestionAndOptionScene extends Phaser.Scene{
    private buttonSound: Phaser.Sound.BaseSound | null = null;
    private fruitService: FruitService | null = null;
    private questionService: QuestionService | null = null;
    private optionService: OptionService | null = null;
    private levelId: number;
    private fruitId: number;
    private fruitsCaught: Map<number, { levelId: number, fruitId: number }[]> = new Map();
    private validFruitsCount: number;
    private currentCount: any;
    public buttonOption: Phaser.GameObjects.Image; // Change from private to public

    
    
    constructor(){
        super("QuestionAndOptionScene");
    }
    init(data: { score: number, levelId: number, fruitsCaught: { levelId: number, fruitId: number }[],validFruitsCount: number }) {
        this.levelId = data.levelId;
        this.validFruitsCount = data.validFruitsCount;

        data.fruitsCaught.forEach(fruit => {
            if (!this.fruitsCaught.has(fruit.levelId)) {
                this.fruitsCaught.set(fruit.levelId, []);
            }
            this.fruitsCaught.get(fruit.levelId)!.push(fruit);
        });

        console.log('Fruits caught (grouped by level):', this.fruitsCaught);
    }
    preaload(){

    }
    async create(){

        const fruitCountPerLevel: Map<number, number> = new Map();

        this.fruitsCaught.forEach((fruits, levelId) => {
            const count = fruits.filter(fruitData => fruitData.fruitId !== 0).length;
            fruitCountPerLevel.set(levelId, count);
        });

        fruitCountPerLevel.forEach((count, levelId) => {
            console.log(`Level ${levelId}: Số lượng fruitId khác 0 là ${count}`);
        });

        this.buttonSound = this.sound.add("sound_initial", {
            volume: 1, 
        });
        this.add.text(180, 450, "Use the picture graph above to find the correct amount.", { fontSize: '15px Arial', color: 'black' });

        this.questionService = new QuestionService(this, "assets/Data/question.json");
        await this.questionService.initialize(this.levelId);

        const questionDTO = this.questionService.getQuestionDTOById(this.levelId);

        if (questionDTO && questionDTO.questionId !== undefined) {
            // console.log(questionDTO);
            const questionId = questionDTO.questionId;

            this.optionService = new OptionService(this, "assets/Data/option.json");
            await this.optionService.initialize(questionId);
            const optionDTOs = this.optionService.getAllOptionDTOs1(questionId);
            // console.log("op", optionDTOs);

            const currentCount = fruitCountPerLevel.get(this.levelId) || 0;

            const optionView = this.optionService.getAllOptionViews();
            // console.log(optionView);


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

        // this.add.text(510, 15, "Next Level", { fontSize: '30px Arial', fontStyle: "bold", color: 'black' })
        // .setInteractive() 
        // .on('pointerdown', () => {
        //     this.levelId += 1;
    
        //     console.log("Transitioning to LevelScene with levelId:", this.levelId);
        //     this.scene.start('LevelScene', {
        //         levelId: this.levelId,
        //     });
        //     this.scene.stop('QuestionAndOptionScene', {
        //     });
        //     this.scene.stop('ResultScene', {
        //     });
            
        // });

    }
    checkAnswer(currentCount: number, optionDTO: OptionDTO): void {
        if (currentCount === optionDTO.value) {
            console.log("đúng"); 
            this.levelId += 1;
    
            console.log("Transitioning to LevelScene with levelId:", this.levelId);
            this.scene.start('LevelScene', {
                levelId: this.levelId,
            });
            this.scene.stop('QuestionAndOptionScene', {
            });
            this.scene.stop('ResultScene', {
            });
            
        } else {
            console.log("sai");
            this.scene.stop("QuestionAndOptionScene")
            this.scene.launch("WrongChoiceScene", {
            levelId: this.levelId,
            fruitsCaught: Array.from(this.fruitsCaught.entries()).map(([levelId, fruits]) => ({
                levelId,
                fruits,
            })),
            validFruitsCount: this.validFruitsCount,
            currentCount: currentCount,
        });
        }
    }

    update(){

    }
}
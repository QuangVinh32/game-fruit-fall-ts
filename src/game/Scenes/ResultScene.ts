import FruitService from "../Service/FruitService";
import OptionService from "../Service/OptionService";
import QuestionService from "../Service/QuestionService";

export default class ResultScene extends Phaser.Scene {
    private fruitService: FruitService | null = null;
    private questionService: QuestionService | null = null;
    private optionService: OptionService | null = null;
    private levelId: number;
    private fruitId: number;
    private questionId: number;
    private fruitsCaught: Map<number, { levelId: number, fruitId: number }[]> = new Map();
    private validFruitsCount: number;


    constructor() {
        super("ResultScene");
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
        // console.log("Số lượng trái cây hợp lệ:", this.validFruitsCount);

    }
    
    async create() {

        // const fruitCountPerLevel: Map<number, number> = new Map();

        // this.fruitsCaught.forEach((fruits, levelId) => {
        //     const count = fruits.filter(fruitData => fruitData.fruitId !== 0).length;
        //     fruitCountPerLevel.set(levelId, count);
        // });

        // fruitCountPerLevel.forEach((count, levelId) => {
        //     console.log(`Level ${levelId}: Số lượng fruitId khác 0 là ${count}`);
        // });


        this.add.text(230, 15, "The Farmer's Fruit", { fontSize: '30px Arial', fontStyle: "bold", color: 'black' });

        const gridStartX = 50;
        const gridStartY = 80; 
        const cellWidth = 60; 
        const cellHeight = 60; 
        const rows = 5; 
        const cols = 10;

        const graphics = this.add.graphics();
        graphics.lineStyle(4, 0x000000, 1);
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = gridStartX + col * cellWidth;
                const y = gridStartY + row * cellHeight;
                graphics.strokeRect(x, y, cellWidth, cellHeight);
            }
        }
        // Thêm số ở phía trái (5, 4, 3, 2, 1)
        for (let row = 0; row < rows; row++) {
            const number = rows - row;
            this.add.text(
                gridStartX - 25, 
                gridStartY + row * cellHeight + cellHeight / 2 - 10, 
                number.toString(), 
                { fontSize: '20px', color: 'black', fontStyle: "bold" }
            );
        }
        this.fruitService = new FruitService(this, "assets/Data/fruit.json");
        await this.fruitService.initializeNoView();
        

        this.fruitsCaught.forEach((fruits, levelId) => {
            fruits.forEach((fruitData, index) => {
                const fruitDTO = this.fruitService?.getFruitDTOById(fruitData.fruitId, levelId);
                if (fruitDTO) {
                    const x = 50 + (levelId - 1) * 60 + 30;
                    const y = 80 + index * 60 + 30;

                    const fruitType = this.fruitService?.getFruitTypeById(fruitDTO.fruitTypeId);
                    if (fruitType) {
                        this.add.sprite(x, y, fruitType.texture)
                            .setOrigin(0.5, 0.5)
                            .setDisplaySize(fruitDTO.width, fruitDTO.height);
                    }
                } else {
                    console.warn(`Missing data for fruitId: ${fruitData.fruitId} in level ${levelId}`);
                }
            });
        });
            
        // Thêm tên trái cây dưới mỗi cột
        const fruitNames = [
            "Apples", "Pears", "Oranges", "Lemons", "Limes", 
            "Peaches", "Cherries", "Mangoes", "Kiwis", "Star Fruit"
        ];

        for (let col = 0; col < cols; col++) {
            this.add.text(
                gridStartX + col * cellWidth + cellWidth / 2 - 28, 
                gridStartY + rows * cellHeight + 10, 
                fruitNames[col % fruitNames.length], 
                { fontSize: '12px', color: 'black', fontStyle: "bold" }
            );
        }

        // // this.add.text(150, 410, "How many did you catch?", { fontSize: '30px Arial', fontStyle: "bold", color: 'black' });
        // this.add.text(180, 450, "Use the picture graph above to find the correct amount.", { fontSize: '15px Arial', color: 'black' });

        // this.questionService = new QuestionService(this, "assets/Data/question.json");
        // await this.questionService.initialize(this.levelId);

        // const questionDTO = this.questionService.getQuestionDTOById(this.levelId);

        // if (questionDTO && questionDTO.questionId !== undefined) {
        //     console.log(questionDTO);
        //     const questionId = questionDTO.questionId;
        //     this.optionService = new OptionService(this, "assets/Data/option.json");
        //     await this.optionService.initialize(questionId);
        //     const optionDTO = this.optionService.getAllOptionDTOs();
        //     console.log("op", optionDTO);
        // } else {
        //     console.error("Không thể lấy questionDTO hoặc questionId không hợp lệ");
        // }

        // this.add.text(510, 15, "Next Level", { fontSize: '30px Arial', fontStyle: "bold", color: 'black' })
        // .setInteractive() 
        // .on('pointerdown', () => {
        //     this.levelId += 1;
    
        //     console.log("Transitioning to LevelScene with levelId:", this.levelId);
        //     this.scene.start('LevelScene', {
        //         levelId: this.levelId,
        //     });
        // });
    
    }

    update() {}
}

import FruitService from "../Service/FruitService";
import OptionService from "../Service/OptionService";
import QuestionService from "../Service/QuestionService";

export default class ResultScene extends Phaser.Scene {
    private fruitService: FruitService | null = null;
    private questionService: QuestionService | null = null;
    private optionService: OptionService | null = null;
    private levelId: number;
    private fruitsCaught: Map<number, { levelId: number, fruitId: number }[]> = new Map();
    private validFruitsCount: number;
    private score: number;

    constructor() {
        super("ResultScene");
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
    async create() {
        // Add the title text
        this.add.text(230, 15, "The Farmer's Fruit", { fontSize: '30px Arial', fontStyle: "bold", color: 'black' });

        const gridStartX = 50;
        const gridStartY = 80;
        const cellWidth = 60;
        const cellHeight = 60;
        const rows = 5;
        const cols = 10;

        // Create the grid
        const graphics = this.add.graphics();
        graphics.lineStyle(4, 0x000000, 1);
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = gridStartX + col * cellWidth;
                const y = gridStartY + row * cellHeight;
                graphics.strokeRect(x, y, cellWidth, cellHeight);
            }
        }

        // Add numbers to the left side (5, 4, 3, 2, 1)
        for (let row = 0; row < rows; row++) {
            const number = rows - row;
            this.add.text(
                gridStartX - 25,
                gridStartY + row * cellHeight + cellHeight / 2 - 10,
                number.toString(),
                { fontSize: '20px', color: 'black', fontStyle: "bold" }
            );
        }

        // Initialize the FruitService
        this.fruitService = new FruitService(this, "assets/Data/fruit.json");
        await this.fruitService.initializeNoView();

        // Loop through fruitsCaught matrix and display fruit sprites
        this.fruitsCaught.forEach((fruits, levelId) => {
            fruits.forEach((fruitData, index) => {
                const fruitDTO = this.fruitService?.getFruitDTOById(fruitData.fruitId, levelId);
                if (fruitDTO) {
                    const x = gridStartX + (levelId - 1) * cellWidth + 30;
                    const y = gridStartY + index * cellHeight + 30;

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

        // Add fruit names below each column
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

        // Button for transitioning to the next level
        this.add.text(90, 15, "Next Level", { fontSize: '25px Arial', fontStyle: "bold", color: 'red' })
            .setInteractive()
            .on('pointerdown', () => {
                this.levelId += 1;
                console.log("Transitioning to LevelScene with levelId:", this.levelId);
                this.scene.start('LevelScene', { levelId: this.levelId });
                this.scene.stop('QuestionAndOptionScene');
            });

        // Button for showing wrong answers
        this.add.text(510, 15, "Wrong Answer", { fontSize: '25px Arial', fontStyle: "bold", color: 'red' })
            .setInteractive()
            .on('pointerdown', () => {
                // Clear the caught fruits for the current level
                const currentLevelFruits = this.fruitsCaught.get(this.levelId);
                if (currentLevelFruits) {
                    currentLevelFruits.length = 0; 
                }
                console.log('Fruits caught for the current level cleared:', this.fruitsCaught);

                // Reset the valid fruits count and transition back to the current level
                this.validFruitsCount = 0;
                console.log("Level before:", this.levelId);
                this.scene.start('LevelScene', {
                    levelId: this.levelId,
                    fruitsCaught: Array.from(this.fruitsCaught.get(this.levelId) || []),
                });
                this.scene.stop("QuestionAndOptionScene");
            });
    }

    update() {}
}

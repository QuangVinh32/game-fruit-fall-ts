import FruitService from "../Services/FruitService";

const CONFIG = {
    TOTAL_GRID_WIDTH: 600,
    TOTAL_GRID_HEIGHT: 300,
    FONT_SIZE_TITLE: '30px Arial',
    FONT_SIZE_LABEL: '20px',
    FONT_SIZE_FOOTER: '12px',
    ROW_START_Y: 85,
    GRID_OFFSET: 25,
};

export default class ResultScene extends Phaser.Scene {
    private fruitService: FruitService;

    private levelId: number;
    private fruitsCaught: Map<number, { levelId: number, fruitId: number }[]> = new Map();

    // private totalWidth = 600; 
    // private totalHeight = 300;

    constructor() {
        super("ResultScene");
    }

    init(data: { score: number, levelId: number, fruitsCaughtMatrix: { [key: number]: { levelId: number, fruitId: number }[] } }) {
        this.levelId = data.levelId;

        this.fruitsCaught = new Map(Object.entries(data.fruitsCaughtMatrix).map(([key, value]) => [parseInt(key), value]));
    }

    async create() {
        this.add.text(this.scale.width / 2, this.scale.height / 20, "The Farmer's Fruit", { fontSize: '30px Arial', fontStyle: "bold", color: 'black' }).setOrigin(0.5, 0);
        
        this.fruitService = new FruitService(this, "assets/Data/fruit.json");
        await this.fruitService.initializeNoView();

        const fruitsAtLevel = this.fruitService.getFruitsByLevelId(this.levelId);
        console.log("fruitAtLevel", fruitsAtLevel);

     

      // Tìm fruitCount lớn nhất qua tất cả các levels
        let maxFruitCount = 0;

        this.fruitsCaught.forEach((fruits, levelId) => {
            const fruitsAtLevel = this.fruitService.getFruitsByLevelId(levelId);
            const fruitCount = fruitsAtLevel.length;

            if (fruitCount > maxFruitCount) {
                maxFruitCount = fruitCount;
            }

            console.log(`Level ${levelId}: FruitCount = ${fruitCount}`);
        });

        const rows = maxFruitCount;
        console.log(`Max FruitCount (Rows) = ${rows}`);

        // Tính tổng số levelId
        const levelIds = this.fruitService.getUniqueLevelIds();
        const cols = levelIds.length; // Số cột bằng số lượng levelId
        console.log(`Cols (Number of unique levels) = ${cols}`);

        const cellWidth = CONFIG.TOTAL_GRID_WIDTH / cols; 
        const cellHeight = CONFIG.TOTAL_GRID_HEIGHT / rows;

        const gridStartX = (this.scale.width - CONFIG.TOTAL_GRID_WIDTH ) / 2; 
        const gridStartY = CONFIG.ROW_START_Y;

        const graphics = this.add.graphics();
        graphics.lineStyle(4, 0x000000, 1);

        // Vẽ lưới động với số hàng và cột thay đổi
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = gridStartX + col * cellWidth;
                const y = gridStartY + row * cellHeight;

                graphics.strokeRect(x, y, cellWidth, cellHeight);
            }
        }

        for (let row = 0; row < rows; row++) {
            const number = rows - row;
            this.add.text(
                gridStartX - CONFIG.GRID_OFFSET,
                gridStartY + row * cellHeight + cellHeight / 2 - 10,
                number.toString(),
                { fontSize: CONFIG.FONT_SIZE_LABEL, color: 'black', fontStyle: "bold" }
            );
        }

        this.fruitService = new FruitService(this, "assets/Data/fruit.json");
        await this.fruitService.initializeNoView();

        this.fruitsCaught.forEach((fruits, levelId) => {
            fruits.forEach((fruitData, index) => {
                const fruitDTO = this.fruitService?.getFruitDTOById(fruitData.fruitId, levelId);

                if (fruitDTO) {
                    const x = gridStartX + (levelId - 1) * cellWidth + cellWidth / 2;
                    const y = gridStartY + (rows - 1 - index) * cellHeight + cellHeight / 2;

                    const fruitType = this.fruitService?.getFruitTypeById(fruitDTO.id);
                    if (fruitType) {
                        this.add.sprite(x, y, fruitType.texture)
                            .setOrigin(0.5, 0.5)
                            .setDisplaySize(
                                Math.min(cellWidth * 0.8, fruitDTO.width),
                                Math.min(cellHeight * 0.8, fruitDTO.height)
                            );
                    }
                } else {
                    console.warn(`Missing data for fruitId: ${fruitData.fruitId} in level ${levelId}`);
                }
            });
        });

        const fruitNames = [
            "Apples", "Pears", "Oranges", "Lemons", "Limes", 
            "Peaches", "Cherries", "Mangoes", "Kiwis", "Star Fruit", "  ABC", "DEF"
        ];

        for (let col = 0; col < cols; col++) {
            this.add.text(
                gridStartX + col * cellWidth + cellWidth / 2 - 28,
                gridStartY + rows * cellHeight + 10,
                fruitNames[col % fruitNames.length],
                { fontSize: '12px', color: 'black', fontStyle: "bold" }
            );
        }
    }

    update() {}
}

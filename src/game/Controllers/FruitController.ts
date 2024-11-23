import FruitDTO  from "../DTOs/FruitDTO";

export default class FruitController {
    private fruits: FruitDTO[]; 

    constructor() {
        this.fruits = [];
    }

    addFruits(dto: FruitDTO): void {
        this.fruits.push(dto);
    }

    getAllFruits(): FruitDTO[] {
        return this.fruits;
    }

    getFruitDTOById(fruitId: number, levelId: number): FruitDTO | undefined {
        return this.fruits.find(fruit => fruit.fruitId === fruitId && fruit.levelId === levelId);
    }
    

}
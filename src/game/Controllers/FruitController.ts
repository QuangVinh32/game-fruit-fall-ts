import { BaseController } from "mct-common";
import FruitDTO from "../DTOs/FruitDTO";

export default class FruitController extends BaseController<FruitDTO> {
    
    getFruitDTOByLevelIdAndId(fruitId: number, levelId: number): FruitDTO | undefined {
        return this.items.find(fruit => fruit.fruitId === fruitId && fruit.levelId === levelId);
    }
}

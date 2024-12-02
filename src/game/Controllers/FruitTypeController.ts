import FruitTypeDTO from "../DTOs/FruitTypeDTO";

export default class FruitTypeController {
    private fruitTypes: FruitTypeDTO[] = [];

    addFruitTypes(fruitType: FruitTypeDTO): void {
        this.fruitTypes.push(fruitType);
    }

    findFruitTypeById(id: number): FruitTypeDTO | undefined {
        return this.fruitTypes.find(fruitType => fruitType.id === id);
    }

    getAllFruitTypes(): FruitTypeDTO[] {
        return this.fruitTypes;
    }
}

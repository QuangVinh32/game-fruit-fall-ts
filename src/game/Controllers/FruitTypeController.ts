import FruitTypeDTO from "../DTOs/FruitTypeDTO";

export default class FruitTypeController {
    private fruitTypes: FruitTypeDTO[] = [];

    addFruitTypes(fruitType: FruitTypeDTO): void {
        this.fruitTypes.push(fruitType);
    }

    findFruitTypeById(fruitTypeId: number): FruitTypeDTO | undefined {
        return this.fruitTypes.find(fruitType => fruitType.fruitTypeId === fruitTypeId);
    }

    getAllFruitTypes(): FruitTypeDTO[] {
        return this.fruitTypes;
    }
}

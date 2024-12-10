import FruitDTO from "../DTOs/FruitDTO";
import FruitTypeDTO from "../DTOs/FruitTypeDTO";
import FruitTypeController from "../Controllers/FruitTypeController";
import FruitController from "../Controllers/FruitController";
import FruitView from "../Views/FruitView";
import BaseService from "./BaseService";

export default class FruitService  extends BaseService<FruitDTO>{

    private fruitViews: FruitView[] = [];
    private fruitDTOs: FruitDTO[] = [];
    private fruitTypes: FruitTypeDTO[] = [];
    private fruitTypeController: FruitTypeController;
    private fruitController: FruitController;

    constructor(scene: Phaser.Scene, jsonPath: string) {
        super(scene, jsonPath);
        this.scene = scene;
        this.jsonPath = jsonPath;
        this.fruitTypeController = new FruitTypeController();
        this.fruitController = new FruitController();
    }

    public mapFruitTypes(data: any): void {
        if (Array.isArray(data.fruitTypes)) {
            this.fruitTypes = data.fruitTypes.map((typeData: any) => new FruitTypeDTO(typeData.id, typeData.name, typeData.texture));
            this.fruitTypes.forEach(fruitType => this.fruitTypeController.addItem(fruitType));
        } else {
            console.error("Invalid or missing fruitTypes data:", data.fruitTypes);
        }
    }   

    public mapFruits(data: any, levelId?: number, fruitId?: number): FruitDTO[] {
        const fruits = Array.isArray(data.fruits) ? data.fruits : [];
        if (!fruits.length) {
            console.error("Invalid or missing fruits data:", data.fruits);
        }
    
        return fruits
            .filter((fruit: any) => (levelId ? fruit.levelId === levelId : true) && 
                                    (fruitId ? fruit.fruitId === fruitId : true))
            .map((fruit: any) => new FruitDTO(
                fruit.fruitId, 
                fruit.positionX, 
                fruit.positionY, 
                fruit.width, 
                fruit.height, 
                fruit.id, 
                fruit.levelId
            ));
    }
    
    public async initialize(levelId?: number): Promise<void> {
        try {
            const data = await this.loadData();
            this.mapFruitTypes(data);
            const fruits = this.mapFruits(data, levelId);
            fruits.forEach(dto => this.fruitController.addItem(dto));
            fruits.forEach(dto => this.createFruitView(dto));
        } catch (error) {
            console.error("Failed to initialize fruit service:", error);
        }
    }

    public async initializeNoView(levelId?: number, screenWidth?: number, screenHeight?: number): Promise<void> {
        try {
            const data = await this.loadData();
            this.mapFruitTypes(data);
            const fruits = this.mapFruits(data, levelId);
            fruits.forEach(dto => this.fruitController.addItem(dto));
        } catch (error) {
            console.error("Failed to initialize fruit service:", error);
        }
    }

    public getFruitsByLevelId(levelId: number): FruitDTO[] {
        return this.fruitController.getAllItems().filter(fruit => fruit.levelId === levelId);
    }
    

    public getFruitTypeById(id: number): FruitTypeDTO | undefined {
        return this.fruitTypes.find(fruitType => fruitType.id === id);
    }
    
    public getFruitDTOById(fruitId: number,levelId: number): FruitDTO | undefined {
        return this.fruitController.getFruitDTOByLevelIdAndId(fruitId,levelId);
    }

    public createFruitView(fruitData: FruitDTO): void {
        const fruitType = this.fruitTypeController.getItemByProperty("id", fruitData.id);
        if (fruitType) {
            const fruitView = new FruitView(this.scene, fruitData, fruitType);
            this.fruitViews.push(fruitView);
        } else {
            console.warn(`FruitType for fruitId ${fruitData.fruitId} not found`);
        }
    }

    public getFruitViewById(fruitId: number, levelId: number): FruitView | undefined {
        return this.fruitViews.find(fruitView => 
            fruitView.fruitData.fruitId === fruitId && fruitView.fruitData.levelId === levelId);
    }
    public getUniqueLevelIds(): number[] {
        const fruits = this.fruitController.getAllItems();
        const levelIds: number[] = [];
        fruits.forEach(fruit => {
            if (!levelIds.includes(fruit.levelId)) {
                levelIds.push(fruit.levelId);
            }
        });
        return levelIds;
    }
    
    
    
}

import LevelDTO from "../DTOs/LevelDTO";

export default class LevelController{
    private levels: LevelDTO[];
    constructor(){
        this.levels = [];
    }
    addLevels(dto: LevelDTO): void {
        this.levels.push(dto);
    }
    getLevelById(levelId: number): LevelDTO | undefined {
        return this.levels.find(level => level.levelId === levelId)

    }

}
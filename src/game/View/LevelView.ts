import LevelDTO from "../DTOs/LevelDTO";

export default class LevelView extends Phaser.GameObjects.Container{
    public scene: Phaser.Scene;
    public levelData: LevelDTO;

    constructor(scene: Phaser.Scene,levelData: LevelDTO){
        super(scene)
        this.levelData = levelData;

    }
    createLevel(){
        
    }

}
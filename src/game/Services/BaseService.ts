export default class BaseService<T> {
    protected scene: Phaser.Scene;
    protected jsonPath: string;
    protected items: T[] = [];

    constructor(scene: Phaser.Scene, jsonPath: string) {
        this.scene = scene;
        this.jsonPath = jsonPath;
    }
  
    protected async loadData(): Promise<any> {
        try {
            const response = await fetch(this.jsonPath);
            if (!response.ok) {
                throw new Error(`Unable to load data from ${this.jsonPath}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error loading data:", error);
            throw error;
        }
    }
}

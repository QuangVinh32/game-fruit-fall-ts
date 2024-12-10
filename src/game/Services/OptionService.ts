import OptionDTO from "../DTOs/OptionDTO";
import OptionController from "../Controllers/OptionController";
import OptionView from "../Views/OptionView";
import BaseService from "./BaseService";

export default class OptionService extends BaseService<OptionDTO>{
    private controller: OptionController;
    private optionViews: OptionView[] = [];

    constructor(scene: Phaser.Scene, jsonPath: string) {
        super(scene, jsonPath);
        this.controller = new OptionController();
    }

    private mapOptions(data: any): OptionDTO[] {
        const options = Array.isArray(data.options) ? data.options : [];
        if (!options.length) console.error("Invalid or missing options data:", data.options);

        return options.map((optionData: any) => new OptionDTO(
            optionData.optionId,
            optionData.isAnswer,
            optionData.value,
            optionData.questionId,
            optionData.positionX,
            optionData.positionY,
            optionData.width,
            optionData.height
        ));
    }

    public async initialize(questionId: number): Promise<void> {
        const data = await this.loadData();
        const options = this.mapOptions(data);

        options.forEach(option => this.controller.addItem(option));

        const levelOptions = options.filter(option => option.questionId === questionId);
        if (levelOptions.length === 0) {
            console.warn(`No options found for questionId: ${questionId}`);
        } else {
            levelOptions.forEach(option => this.createOptionView(option));
        }
    }

    public getOptionDTOById(optionId: number): OptionDTO | undefined {
        return this.controller.getItemByProperty("optionId",optionId);
    }

    public getAllOptionDTOs(): OptionDTO[] {
        return this.controller.getAllItems();
    }

    public createOptionView(optionData: OptionDTO): void {
        const optionView = new OptionView(this.scene, optionData);
        this.optionViews.push(optionView);
    }

    public getAllOptionViews(): OptionView[] {
        return this.optionViews;
    }

    public getOptionViewById(optionId: number): OptionView | undefined {
        return this.optionViews.find(view => view.optionData.optionId === optionId);
    }
}
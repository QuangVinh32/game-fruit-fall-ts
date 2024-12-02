import OptionDTO from "../DTOs/OptionDTO";
import OptionView from "../Views/OptionView";
import OptionController from "../Controllers/OptionController";

export default class OptionService {
    private jsonPath: string;
    private controller: OptionController;

    constructor(jsonPath: string) {
        this.jsonPath = jsonPath;
        this.controller = new OptionController();
    }

    private async loadData(): Promise<any> {
        const response = await fetch(this.jsonPath);
        return await response.json();
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

    async initialize(questionId: number): Promise<OptionDTO[]> {
        const data = await this.loadData();
        const options = this.mapOptions(data);
        options.forEach(option => this.controller.addOptions(option));
        return options.filter(option => option.questionId === questionId);
    }

    getOptionDTOById(optionId: number): OptionDTO | undefined {
        return this.controller.getOptionById(optionId);
    }
   
    getAllOptionDTOs(questionId: number): OptionDTO[] {
        const allOptions = this.controller.getAllOptions();
            const filteredOptions = allOptions.filter(option => option.questionId === questionId);
        return filteredOptions;
    }
    
}

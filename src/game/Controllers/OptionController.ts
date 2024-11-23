import OptionDTO from "../DTOs/OptionDTO";

export default class OptionController {
    private options: OptionDTO[]; 

    constructor() {
        this.options = [];
    }

    addOptions(dto: OptionDTO): void {
        this.options.push(dto);
    }

    getAllOptions(): OptionDTO[] {
        return this.options;
    }

    getOptionById(questionId: number): OptionDTO | undefined {
        return this.options.find(option => option.questionId === questionId);
    }
}
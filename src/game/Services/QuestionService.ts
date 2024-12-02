import QuestionDTO from "../DTOs/QuestionDTO";
import QuestionController from "../Controllers/QuestionController";

export default class QuestionService {
    private controller: QuestionController;
    private jsonPath: string;

    constructor(jsonPath: string) {
        this.jsonPath = jsonPath;
        this.controller = new QuestionController();
    }

    private async loadData(): Promise<any> {
        const response = await fetch(this.jsonPath);
        return await response.json();
    }

    private mapQuestions(data: any): QuestionDTO[] {
        const questions = Array.isArray(data.questions) ? data.questions : [];
        if (!questions.length) {
            console.error("Invalid or missing questions data:", data.questions);
        }

        return questions.map((questionData: any) => new QuestionDTO(
            questionData.questionId,
            questionData.state,
            questionData.levelId,
            questionData.text,
            questionData.positionX,
            questionData.positionY
        ));
    }

    async initialize(levelId: number): Promise<QuestionDTO[]> {
        const data = await this.loadData();
        const questions = this.mapQuestions(data);
        // this.controller.setQuestions(questions);
        questions.forEach(question => this.controller.addQuestions(question))
        return questions.filter(question => question.levelId === levelId);
    }

    async initializeById(levelId: number, questionId: number): Promise<QuestionDTO[]> {
        const data = await this.loadData();
        const questions = this.mapQuestions(data);
        questions.forEach(question => this.controller.addQuestions(question))
        return questions.filter(
            question => question.levelId === levelId && question.questionId === questionId
        );
    }

    getAllQuestionDTOs(): QuestionDTO[] {
        return this.controller.getAllQuestions();
    }
}

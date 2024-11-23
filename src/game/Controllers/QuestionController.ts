import QuestionDTO from "../DTOs/QuestionDTO";

export default class QuestionController {
    private questions: QuestionDTO[]; 

    constructor() {
        this.questions = [];
    }

    addQuestions(dto: QuestionDTO): void {
        this.questions.push(dto);
    }

    getAllQuestions(): QuestionDTO[] {
        return this.questions;
    }

    getQuestionById(levelId: number): QuestionDTO | undefined {
        return this.questions.find(question => question.levelId === levelId);
    }
}
import QuestionDTO from "../DTOs/QuestionDTO";

export default class QuestionController {
    private questions: QuestionDTO[]; 
    constructor() {
        this.questions = [];
    }

    addQuestions(dto: QuestionDTO): void {
        this.questions.push(dto);
    }

    getQuestionById(levelId: number): QuestionDTO | undefined {
        return this.questions.find(question => question.levelId === levelId);
    }
    
    setQuestions(questions: QuestionDTO[]) {
        this.questions = questions;
    }

    getAllQuestions(): QuestionDTO[] {
        return this.questions;
    }
}
import QuestionDTO from "../DTOs/QuestionDTO";
import QuestionView from "../View/QuestionView";
import QuestionController from "../Controllers/QuestionController";

export default class QuestionService {
    private scene: Phaser.Scene;
    private jsonPath: string;
    private controller: QuestionController;
    private questionViews: QuestionView[] = [];

    constructor(scene: Phaser.Scene, jsonPath: string) {
        this.scene = scene;
        this.jsonPath = jsonPath;
        this.controller = new QuestionController();
    }

    private async loadData(): Promise<any> {
        const response = await fetch(this.jsonPath);
        return await response.json();
    }

    private mapQuestions(data: any): QuestionDTO[] {
        const questions = Array.isArray(data.questions) ? data.questions : [];
        if (!questions.length) console.error("Invalid or missing questions data:", data.questions);

        return questions.map((questionData: any) => new QuestionDTO(
            questionData.questionId,
            questionData.state,
            questionData.levelId,
            questionData.text,
            questionData.positionX,
            questionData.positionY

        ));
    }

    async initialize(levelId: number): Promise<void> {
        const data = await this.loadData();
        const questions = this.mapQuestions(data);

        questions.forEach(question => this.controller.addQuestions  (question));

        const levelQuestions = questions.filter(question => question.levelId === levelId);
        if (levelQuestions.length === 0) {
            console.warn(`No questions found for levelId: ${levelId}`);
        } else {
            levelQuestions.forEach(question => this.createQuestionView(question));
        }
    }

    async initializeById(levelId: number, questionId: number): Promise<void> {
        const data = await this.loadData();
        const questions = this.mapQuestions(data);
    
        questions.forEach(question => this.controller.addQuestions(question));
    
        const filteredQuestions = questions.filter(
            question => question.levelId === levelId && question.questionId === questionId
        );
    
        if (filteredQuestions.length === 0) {
            console.warn(`No questions found for levelId: ${levelId} and questionId: ${questionId}`);
        } else {
            filteredQuestions.forEach(question => this.createQuestionView(question));
        }
    }

    createQuestionView(questionData: QuestionDTO): void {
        const questionView = new QuestionView(this.scene, questionData);
        this.questionViews.push(questionView);
    }

    getAllQuestionViews(): QuestionView[] {
        return this.questionViews;
    }

    getQuestionViewById(questionId: number): QuestionView | undefined {
        return this.questionViews.find(view => view.questionData.questionId === questionId);
    }

    getQuestionDTOById(levelId: number): QuestionDTO | undefined {
        return this.controller.getQuestionById(levelId);
    }

    getAllQuestionDTOs(): QuestionDTO[] {
        return this.controller.getAllQuestions();
    }
}

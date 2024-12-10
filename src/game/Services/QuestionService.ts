import QuestionDTO from "../DTOs/QuestionDTO";
import QuestionController from "../Controllers/QuestionController";
import QuestionView from "../Views/QuestionView";
import BaseService from "./BaseService";

export default class QuestionService extends BaseService<QuestionDTO>{

    private controller: QuestionController;
    private questionViews: QuestionView[] = [];

    constructor(scene: Phaser.Scene, jsonPath: string) {
        super(scene, jsonPath);
        this.controller = new QuestionController();
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

    public async initialize(levelId: number): Promise<void> {
        const data = await this.loadData();
        const questions = this.mapQuestions(data);
        questions.forEach(question => this.controller.addItem(question));
        const levelQuestions = questions.filter(question => question.levelId === levelId);
        if (levelQuestions.length === 0) {
            console.warn(`No questions found for levelId: ${levelId}`);
        } else {
            levelQuestions.forEach(question => this.createQuestionView(question));
        }
    }

    public async initializeById(levelId: number, questionId: number): Promise<void> {
        const data = await this.loadData();
        const questions = this.mapQuestions(data);
    
        questions.forEach(question => this.controller.addItem(question));
    
        const filteredQuestions = questions.filter(
            question => question.levelId === levelId && question.questionId === questionId
        );
    
        if (filteredQuestions.length === 0) {
            console.warn(`No questions found for levelId: ${levelId} and questionId: ${questionId}`);
        } else {
            filteredQuestions.forEach(question => this.createQuestionView(question));
        }
    }

    public getQuestionDTOById(levelId: number): QuestionDTO | undefined {
        return this.controller.getItemByProperty("levelId", levelId);
    }
    
    public getAllQuestionDTOs(): QuestionDTO[] {
        return this.controller.getAllItems();
    }

    public createQuestionView(questionData: QuestionDTO): void {
        const questionView = new QuestionView(this.scene, questionData);
        this.questionViews.push(questionView);
    }

    public getAllQuestionViews(): QuestionView[] {
        return this.questionViews;
    }

    public getQuestionViewById(questionId: number): QuestionView | undefined {
        return this.questionViews.find(view => view.questionData.questionId === questionId);
    }

}
import QuestionDTO from "../DTOs/QuestionDTO";

export default class QuestionView extends Phaser.GameObjects.Container{
    public scene: Phaser.Scene;
    public questionData: QuestionDTO;
    private textQuestion: any;

    constructor(scene: Phaser.Scene, questionData: QuestionDTO) {
        super(scene);
        this.questionData = questionData;
        this.scene.add.existing(this);
        this.createQuestion();
    }
    createQuestion(){
        this.textQuestion = this.scene.add.text(this.questionData.positionX,this.questionData.positionY, this.questionData.text, { fontSize: '30px Arial', color: 'black',fontStyle:"bold" });
        this.add(this.textQuestion)
    }

}
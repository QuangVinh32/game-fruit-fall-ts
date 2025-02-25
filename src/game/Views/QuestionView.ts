import { BaseView } from "mct-common";
import QuestionDTO from "../DTOs/QuestionDTO";

export default class QuestionView extends BaseView {
    public questionData: QuestionDTO;
    private textQuestion: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, questionData: QuestionDTO) {
        super(scene);
        this.questionData = questionData;
        this.createQuestion();
        this.setViewPosition(questionData.positionX,questionData.positionY);
        // updateContainerSize()
        this.animateQuestion(); 
    }

    private createQuestion(): void {
        this.textQuestion = this.scene.add.text(0,0, this.questionData.text, {
            fontSize: '30px Arial',
            color: 'black',
            fontStyle: "bold"
        }).setResolution(2);
        this.add(this.textQuestion);
    }
    private animateQuestion(): void {
        this.scene.tweens.add({
            targets: this.textQuestion,
            x: this.questionData.positionX, 
            duration: 1000, 
            ease: 'Power2.easeInOut', 
            yoyo: true, 
            onYoyo: () => {
                this.setViewPosition(this.questionData.positionX, this.questionData.positionY);
            },
            onComplete: () => {
                // console.log('Animation completed');
            }
        });
    }

}

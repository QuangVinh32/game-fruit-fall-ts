import { BaseView } from "mct-common";
import OpitionDTO from "../DTOs/OptionDTO";

export default class OptionView extends BaseView {
    public optionData: OpitionDTO;
    public buttonOption: Phaser.GameObjects.Image;
    private textQuestion: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, optionData: OpitionDTO) {
        super(scene);
        this.optionData = optionData;
        this.createOption();
        this.setViewPosition(optionData.positionX, optionData.positionY);
        this.updateContainerSize(optionData.width,optionData.height)
        this.playTweenAnimation();
    }

    private createOption(): void {
        this.buttonOption = this.scene.add.image(0, 0, "button")
            .setDisplaySize(this.optionData.width, this.optionData.height)
            .setOrigin(0.5, 0.5)
            .setInteractive();

        this.textQuestion = this.scene.add.text(0, 0, this.optionData.value.toString(), {
            fontSize: '60px',
            color: 'black',
            fontStyle: "bold"
        })
            .setOrigin(0.5, 0.5).setResolution(2);

        this.add(this.buttonOption);
        this.add(this.textQuestion);
    }

    private playTweenAnimation(): void {
        this.scene.tweens.add({
            targets: [this.buttonOption, this.textQuestion],
            scale: { from: 0.75, to: 1 },
            duration: 500, 
            ease: 'Power2',
            yoyo: true, 
            repeat: 0 
        });
    }
}

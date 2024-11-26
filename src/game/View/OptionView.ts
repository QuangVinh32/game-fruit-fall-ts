import OpitionDTO from "../DTOs/OptionDTO";

export default class OptionView extends Phaser.GameObjects.Container {
    public scene: Phaser.Scene;
    public optionData: OpitionDTO;
    public buttonOption: Phaser.GameObjects.Image;
    private textQuestion: Phaser.GameObjects.Text;
    private buttonSound: Phaser.Sound.BaseSound | null = null;

    constructor(scene: Phaser.Scene, optionData: OpitionDTO) {
        super(scene, optionData.positionX, optionData.positionY); 
        this.scene = scene;
        this.optionData = optionData;

        this.scene.add.existing(this); 
        this.createQuestion();
    }

    private createQuestion(): void {
        this.buttonOption = this.scene.add.image(0, 0, "button")
            .setDisplaySize(this.optionData.width, this.optionData.height)
            .setOrigin(0.5, 0.5)
            .setInteractive();

        this.textQuestion = this.scene.add.text(0, 0, this.optionData.value.toString(), {
            fontSize: '35px',
            color: 'black',
            fontStyle: "bold"
        })
            .setOrigin(0.5, 0.5);

        this.buttonSound = this.scene.sound.add("sound_initial", {
            volume: 1,
        });

        this.add(this.buttonOption);
        this.add(this.textQuestion);

        this.buttonOption.on('pointerdown', () => {
            // console.log("Option clicked");
            // if (this.buttonSound) {
            //     this.buttonSound.play();
            // }
        });
    }
}

import Phaser, { Time } from "phaser";
import { EventBus } from '../EventBus';

export default class MainMenu extends Phaser.Scene {

	constructor() {
		super("MainMenu");
	}

	private logo!: Phaser.GameObjects.Image;

    logoTween: Phaser.Tweens.Tween | null;

    startTime: number;
    outsideMessage: Phaser.GameObjects.Text;

    create ()
    {
        this.add.image(512, 384, "background");

		// logo
		const logo = this.add.image(512, 384, "logo");

		// text
		const text = this.add.text(512, 460, "", {});
		text.setOrigin(0.5, 0.5);
		text.text = "Main Menu";
		text.setStyle({ "align": "center", "color": "#ffffff", "fontFamily": "Arial Black", "fontSize": "38px", "stroke": "#000000", "strokeThickness":8});

		this.logo = logo;

		this.events.emit("scene-awake");

        // Communication
        this.startTime = this.game.getTime();
        this.outsideMessage = this.add.text(0, 0, '');
        EventBus.emit('current-scene-ready', this);
    }

    outsideIn (message: string, callback: (message: string) => void)
    {
        // Communication: Show message from outside
        this.outsideMessage.setText(message);

        // Communication: Send message from inside
        this.insideOut(callback);
    }

    insideOut (callback: (message: string) => void)
    {
       callback(Math.floor(this.game.getTime() - this.startTime) + '');
    }
}

export { MainMenu };
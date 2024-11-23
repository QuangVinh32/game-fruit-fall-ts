import Phaser from "phaser";
import { EventBus } from '../EventBus';

export default class Game extends Phaser.Scene {

	constructor() {
		super("Game");
	}

	create() {
        this.cameras.main.setBackgroundColor(0x00ff00);
        EventBus.emit('current-scene-ready', this);
	}
}

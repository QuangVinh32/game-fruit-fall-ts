import FruitService from "../Service/FruitService";
import PlayerService from "../Service/PlayerService";
import UIScene from "./UIScene";

export default class LevelScene extends Phaser.Scene {
    private playerService: PlayerService | null;
    private fruitService: FruitService | null;
    private levelId: number;
    private fruitId: number;
    private canMovePlayer: boolean;
    private canDropFruit: boolean;
    private playerView: any;
    private fruitView: any;
    private score: number;
    private catchSound: Phaser.Sound.BaseSound | null = null;
    private fruitsCaught: { levelId: number, fruitId: number }[]; 
 
    constructor() {
        super("LevelScene");
        this.levelId = 3;
        this.canMovePlayer = false;
        this.canDropFruit = false; 
        this.score = 0;
        this.fruitsCaught = []; 

    }
    preload() {
        this.load.image("player", "assets/Images/player.png");
        this.load.image("apple", "assets/Images/apple.png");
        this.load.image("cherry", "assets/Images/cherry.png");
        this.load.image("kiwi", "assets/Images/kiwi.png");
        this.load.image("lemon", "assets/Images/lemon.png");
        this.load.image("lime", "assets/Images/lime.png");
        this.load.image("mango", "assets/Images/mango.png");
        this.load.image("orrange", "assets/Images/orrange.png");
        this.load.image("peache", "assets/Images/peache.png");
        this.load.image("pear", "assets/Images/pear.png");
        this.load.audio("sound_catch", "assets/Audio/sound_catch.mp3");
    }
    init(data: { levelId: number, fruitsCaught: { levelId: number, fruitId: number }[] }) {
        if (data) {
            this.levelId = data.levelId || 1; 
            this.fruitsCaught = data.fruitsCaught || []; 
        }
        console.log("LevelScene initialized with levelId:", this.levelId);
        console.log("Fruits caught from previous level:", this.fruitsCaught);
    }
    
    async create() {
        this.catchSound = this.sound.add("sound_catch", {
            volume: 3,
        });
        
        this.fruitService = new FruitService(this, "assets/Data/fruit.json");
        await this.fruitService.initialize(this.levelId);
    
        this.playerService = new PlayerService(this, "assets/Data/player.json");
        await this.playerService.initialize(this.levelId);
    
        const playerDTO = this.playerService.getPlayerDTOById(this.levelId);
        if (playerDTO) {
            this.playerView = this.playerService.getPlayerViewById(this.levelId);
            if (this.playerView) {
                this.playerView.setPosition(350, 530);
                this.physics.add.existing(this.playerView);
                this.playerView.body.setCollideWorldBounds(true);
                this.playerView.body.setImmovable(true)

                this.input.on("pointermove", (pointer: any) => {
                    if (this.canMovePlayer) {
                        this.playerView.x = pointer.worldX;
                        this.playerView.y = 530;
                    }
                });
            }
        }

        this.events.on("startFruitFall", () => {
            this.canDropFruit = true;
        });

        this.events.on("enablePlayerMove", () => {
            this.canMovePlayer = true;
        });

        this.startFruitFall();
    }
    startFruitFall() {
        if (!this.fruitService) return;
    
        const fruits = this.fruitService.getFruitsByLevelId(this.levelId);
    
        if (!fruits.length) {
            console.warn(`Không có trái cây nào cho levelId: ${this.levelId}`);
            return;
        }
    
        const spawnFruit = () => {
            if (!this.canDropFruit) return;
    
            if (fruits.length === 0) {
                console.warn("Tất cả trái cây đã được sử dụng.");
                console.log("v",this.levelId)
                this.scene.start('ResultScene', { score: this.score,levelId: this.levelId, fruitsCaught: this.fruitsCaught 
                });
                this.scene.start('QuestionAndOptionScene', { score: this.score,levelId: this.levelId, fruitsCaught: this.fruitsCaught 
                });
                // this.scene.start('WrongChoiceScene');

                return;
            }
    
            const randomIndex = Phaser.Math.Between(0, fruits.length - 1);
            const randomFruit = fruits.splice(randomIndex, 1)[0];
            const fruitView = this.fruitService?.getFruitViewById(randomFruit.fruitId, this.levelId);
    
            console.log("id", randomFruit.fruitId);
    
            if (fruitView) {
                this.physics.add.existing(fruitView);
                const body = fruitView.body as Phaser.Physics.Arcade.Body | null;
    
                if (body) {
                    switch (this.levelId) {
                        case 1:
                            body.setGravityY(800);
                            break;
                        case 2:
                            body.setGravityY(900);
                            break;
                        case 3:
                            body.setGravityY(1000);
                            break;
                        case 4:
                            body.setGravityY(1100);
                            break;
                        default:
                            body.setGravityY(0); 
                            break;
                    }
                    body.setImmovable(true);
                }
    
                this.physics.add.collider(this.playerView, fruitView, (player, fruit) => {
                    if (this.catchSound) {
                        this.catchSound.play();
                    }
                    this.score++;
                    console.log(this.score);
    
                    fruit.destroy();
    
                    const uiScene = this.scene.get('UIScene') as UIScene;
                    if (uiScene) {
                        uiScene.updateLaunchCount(this.score);
                    }
    
                    this.fruitsCaught.push({
                        levelId: this.levelId,
                        fruitId: randomFruit.fruitId
                    });

      
                });
    
                this.time.addEvent({
                    delay: 2000,
                    callback: () => {
                        if (fruitView.body) {
                            const body = fruitView.body as Phaser.Physics.Arcade.Body;
                            if (body && body.touching.none) {
                                this.fruitsCaught.push({
                                    levelId: this.levelId,
                                    fruitId: 0
                                });
                                console.log("Trái cây bị bỏ lỡ, fruitId được đặt thành 0");
                            }
                        }
                    },
                    loop: false,
                });
            }
        };
        this.time.addEvent({
            delay: 2000,
            callback: spawnFruit,
            loop: true,
        });
    }
}

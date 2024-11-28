    import FruitService from "../Service/FruitService";
    import PlayerService from "../Service/PlayerService";
    import UIScene from "./UIScene";

    export default class LevelScene extends Phaser.Scene {
        private playerService: PlayerService | null;
        private fruitService: FruitService | null;
        private levelId: number;
        private canMovePlayer: boolean;
        private canDropFruit: boolean;
        private playerView: any;
        private score: number;
        private catchSound: Phaser.Sound.BaseSound | null = null;
        private fruitsCaught: { levelId: number, fruitId: number }[]; 
        private fruitsCaughtMatrix: Map<number, { levelId: number, fruitId: number }[]> = new Map();
        private validFruitsCount: number;

        constructor() {
            super("LevelScene");
            this.canMovePlayer = false;
            this.canDropFruit = false; 
            this.score = 0;
            this.fruitsCaught = [];
            
        }
        preload() {
            this.load.image("player", "assets/Images/player.png");
            this.load.image("shadow", "assets/Images/shadow.png")
            this.load.image("apple", "assets/Images/apple.png");
            this.load.image("cherry", "assets/Images/cherry.png");
            // this.load.image("kiwi", "assets/Images/kiwi.png");
            this.load.image("lemon", "assets/Images/lemon.png");
            this.load.image("lime", "assets/Images/lime.png");
            // this.load.image("mango", "assets/Images/mango.png");
            this.load.image("orrange", "assets/Images/orrange.png");
            this.load.image("peache", "assets/Images/peache.png");
            this.load.image("pear", "assets/Images/pear.png");
            this.load.audio("sound_catch", "assets/Audio/sound_catch.mp3");
        }
        init(data: { levelId: number, validFruitsCount: number, fruitsCaught: { levelId: number, fruitId: number }[], canMovePlayer?: boolean, canDropFruit?: boolean }) {
            this.levelId = data.levelId || 1;
            this.validFruitsCount = data.validFruitsCount || 0;
            this.fruitsCaught = data.fruitsCaught || [];
            
            this.canMovePlayer = data.canMovePlayer ?? false;
            this.canDropFruit = data.canDropFruit ?? false;
        
            if (this.score > 0 && this.validFruitsCount > 0) {
                this.score -= this.validFruitsCount;
                if (this.score < 0) {
                    // this.score = 0; 
                }        
            }
            // console.log("Score after deduction:", this.score);
            // console.log("canMovePlayer:", this.canMovePlayer);
            // console.log("canDropFruit:", this.canDropFruit);
        }
        
        
        async create() {
            // console.log("canMovePlayer:", this.canMovePlayer);
            // console.log("canDropFruit:", this.canDropFruit);

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
                    this.playerView.setPosition(350, 490);
                    this.physics.add.existing(this.playerView);
                    this.playerView.body.setCollideWorldBounds(true);
                    this.playerView.body.setImmovable(true);
        
                    this.input.on("pointermove", (pointer: any) => {
                        if (this.canMovePlayer) {
                            this.playerView.x = pointer.worldX;
                            this.playerView.y = 490;
                        }
                    });
                }
            }
        
            this.events.on("startFruitFall", () => {
                this.canDropFruit = true;
                // console.log("dropFruit",this.canDropFruit)
            });
        
            this.events.on("enablePlayerMove", () => {
                this.canMovePlayer = true;
                // console.log("movePlayer",this.canMovePlayer)

            });
        
            this.startFruitFall();
        }
        
        startFruitFall() {
            if (!this.fruitService) return;
        
            const fruits = this.fruitService.getFruitsByLevelId(this.levelId);
        
            if (!fruits.length) {
                // console.warn(`Không có trái cây nào cho levelId: ${this.levelId}`);
                return;
            }
        
            const spawnFruit = () => {
                if (!this.canDropFruit) return;
        
                if (fruits.length === 0) {
                    console.warn("Tất cả trái cây đã được sử dụng.");
                    this.canMovePlayer = false;
                    this.canDropFruit = false;
                    this.scene.start('ResultScene', { score: this.score, levelId: this.levelId,   
                    fruitsCaughtMatrix: Object.fromEntries(this.fruitsCaughtMatrix),});
                    this.scene.start('QuestionAndOptionScene', { score: this.score, levelId: this.levelId,   
                    fruitsCaughtMatrix: Object.fromEntries(this.fruitsCaughtMatrix),});
                    return;
                }
        
                const randomIndex = Phaser.Math.Between(0, fruits.length - 1);
                const randomFruit = fruits.splice(randomIndex, 1)[0];
                const fruitView = this.fruitService?.getFruitViewById(randomFruit.fruitId, this.levelId);
        
                // console.log("FruitId", randomFruit.fruitId);
        
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

                        // console.log("score of Level", this.score)
        
                        fruit.destroy();
        
                        const uiScene = this.scene.get('UIScene') as UIScene;
                        if (uiScene) {
                            uiScene.updateLaunchCount(this.score); 
                        }
                        
        
                        const caughtFruit = {
                            levelId: this.levelId,
                            fruitId: randomFruit.fruitId
                        };

                        this.fruitsCaught.push(caughtFruit);

                        if (!this.fruitsCaughtMatrix.has(this.levelId)) {
                            this.fruitsCaughtMatrix.set(this.levelId, []);
                        }
                        this.fruitsCaughtMatrix.get(this.levelId)?.push(caughtFruit);

                        this.tweens.add({
                            targets: this.playerView.player, 
                            y: this.playerView.player.y + 5, 
                            duration: 100, 
                            yoyo: true, 
                            ease: 'Bounce',
                        });

                        // console.log("fruitsCaughtMatrix:", Array.from(this.fruitsCaughtMatrix.entries()));
                    });
        
                    // let fruitSpawnDelay = 2000;
                    // switch (this.levelId) {
                    //     case 1:
                    //         fruitSpawnDelay = 2500;
                    //         break;
                    //     case 2:
                    //         fruitSpawnDelay = 2200;
                    //         break;
                    //     case 3:
                    //         fruitSpawnDelay = 2000;
                    //         break;
                    //     case 4:
                    //         fruitSpawnDelay = 1800;
                    //         break;
                    //     default:
                    //         fruitSpawnDelay = 2000;
                    //         break;
                    // }
        
                    // this.time.addEvent({
                    //     delay: fruitSpawnDelay,
                    //     callback: () => {
                    //         if (fruitView.body) {
                    //             const body = fruitView.body as Phaser.Physics.Arcade.Body;
                    
                    //             if (body && body.touching.none) {
                    //                 const missedFruit = {
                    //                     levelId: this.levelId,
                    //                     fruitId: 0 
                    //                 };
                    
                    //                 this.fruitsCaught.push(missedFruit);
                    
                    //                 if (!this.fruitsCaughtMatrix.has(this.levelId)) {
                    //                     this.fruitsCaughtMatrix.set(this.levelId, []);
                    //                 }
                    //                 this.fruitsCaughtMatrix.get(this.levelId)?.push(missedFruit);
                    
                    //                 console.log("Trái cây bị bỏ lỡ:", missedFruit);
                    //                 console.log("fruitsCaughtMatrix hiện tại:", Array.from(this.fruitsCaughtMatrix.entries()));
                    //             }
                    //         }
                    //     },
                    //     loop: false,
                    // });
                    
                }
            };
        
            this.time.addEvent({
                delay: 1500,
                callback: spawnFruit,
                loop: true,
            });
        }
    }        
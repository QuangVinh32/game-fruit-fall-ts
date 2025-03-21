
export default class TestScene extends Phaser.Scene {
    private levelId: number;
    private score: number;
    private dataC: string;
    private button: Phaser.GameObjects.Text;

    constructor() {
        super('TestScene');
        this.dataC = "Dữ liệu của C"
    }

    init(data?: { levelId?: number; score?: number }) {
        this.levelId = data?.levelId ?? 1;  
        this.score = data?.score ?? 50;
        console.log(`[C] Nhận dữ liệu từ B: ${data?.levelId} và ${data?.score}`)
    }

    preload() {
        this.load.pack('pack', 'assets/boot-asset-pack.json');
    }

    create() {
        this.add.text(this.scale.width / 2 - 5, this.scale.height / 2 - 80, `Level ID: ${this.levelId}`, {
            fontSize: '30px Arial',
            fontStyle: "bold",
            color: 'black'
        }).setOrigin(0.5).setResolution(2);

        this.add.text(this.scale.width / 2 - 5, this.scale.height / 2, `Score: ${this.score}`, {
            fontSize: '25px Arial',
            color: 'black'
        }).setOrigin(0.5).setResolution(2);

        this.button = this.add.text(this.scale.width / 2, this.scale.height / 2 + 80, 'Tăng điểm +10', {
            fontSize: '20px',
            backgroundColor: '#00aaff',
            padding: { left: 20, right: 20, top: 20, bottom: 20 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => this.button.setStyle({ backgroundColor: '#0077cc' })) 
        .on('pointerout', () => this.button.setStyle({ backgroundColor: '#00aaff' }));


        this.button.on('pointerdown', () => {
            this.score += 10; 
            console.log(`[C] Gửi dữ liệu lên B: ${this.score}`);
        
            window.parent.postMessage({
                action: "DATA_FROM_TESTSCENE",
                dataTestScene: this.dataC,
                newScore: this.score
            }, "*");
        });
        
    }
}

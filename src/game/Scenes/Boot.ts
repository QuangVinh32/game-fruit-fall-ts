import { Scene } from 'phaser';

export default class Boot extends Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        this.load.pack('pack', 'assets/boot-asset-pack.json');
    }

    create() {
        console.log("🚀 Boot Scene đã khởi chạy");

        // Lắng nghe tin nhắn từ React
        window.addEventListener("message", (event) => {
            console.log("📩 Game nhận tin nhắn:", event.data);

            if (event.data?.action === "START_GAME") {
                console.log("🕹️ Bắt đầu game với nội dung:", event.data.data);
                
                // Chuyển sang LoadingScene hoặc GamePlayScene
                this.scene.start('GamePlayScene');
            }
        });

        this.scene.start('LoadingScene');
    }
}

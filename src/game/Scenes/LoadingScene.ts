export default class LoadingScene extends Phaser.Scene {
    constructor() {
        super("LoadingScene");
    }

    preload() {
        this.load.image("loader", "assets/Images/loader.gif");
 
    }

    async create() {
        const titleText = this.add.text(this.scale.width / 2, this.scale.height / 2 - 80, 'Fruit Fall', {
            fontSize: '30px Arial',
            fontStyle: "bold",
            color: 'black'
        }).setOrigin(0.5);

        const loadingText = this.add.text(this.scale.width / 2 - 5, this.scale.height / 2 + 30, 'LOADING', {
            fontSize: '15px Arial',
            color: 'black'
        }).setOrigin(0.5);

        // // Tạo phần tử DOM HTML để hiển thị GIF
        // const gifElement = document.createElement('img');
        // gifElement.src = 'assets/Images/loader.gif';
        // gifElement.style.position = 'absolute';
        // gifElement.style.top = `${this.scale.height / 2 }px`;
        // gifElement.style.left = `${this.scale.width / 2}px`;
        // gifElement.style.width = '80px';
        // gifElement.style.height = '80px';
        // document.body.appendChild(gifElement);

        this.cameras.main.once('camerafadeoutcomplete', () => {
            // gifElement.remove(); 
            this.scene.start('LevelScene');
            this.scene.launch('PlayGameScene');
        });

        this.cameras.main.fadeOut(1000, 255, 255, 255); 
    }

    update() {
        // Không cần logic cập nhật
    }
}

import PlayerDTO from "../DTOs/PlayerDTO";
import PlayerView from "../View/PlayerView";
import PlayerController from "../Controllers/PlayerController";

export default class PlayerService {
    private scene: Phaser.Scene;
    private jsonPath: string;
    private controller: PlayerController;
    private playerViews: PlayerView[] = [];

    constructor(scene: Phaser.Scene, jsonPath: string) {
        this.scene = scene;
        this.jsonPath = jsonPath;
        this.controller = new PlayerController();
    }

    private async loadData(): Promise<any> {
        const response = await fetch(this.jsonPath);
        return await response.json();
    }

    private mapPlayers(data: any): PlayerDTO[] {
        const players = Array.isArray(data.players) ? data.players : [];
        if (!players.length) console.error("Invalid or missing players data:", data.players);

        return players.map((playerData: any) => new PlayerDTO(
            playerData.playerId,
            playerData.positionX,
            playerData.positionY,
            playerData.width,
            playerData.height,
            playerData.bounce,
            playerData.texture,
            playerData.levelId
        ));
    }

    async initialize(levelId: number): Promise<void> {
        const data = await this.loadData();
        const players = this.mapPlayers(data);

        players.forEach(player => this.controller.addPlayers(player));

        const levelPlayers = players.filter(player => player.levelId === levelId);
        if (levelPlayers.length === 0) {
            console.warn(`No players found for levelId: ${levelId}`);
        } else {
            levelPlayers.forEach(player => this.createPlayerView(player));
        }
    }

    createPlayerView(playerData: PlayerDTO): void {
        const playerView = new PlayerView(this.scene, playerData);
        this.playerViews.push(playerView);
    }

    getAllPlayerViews(): PlayerView[] {
        return this.playerViews;
    }

    getPlayerViewById(playerId: number): PlayerView | undefined {
        return this.playerViews.find(view => view.playerData.playerId === playerId);
    }

    getPlayerDTOById(playerId: number): PlayerDTO | undefined {
        return this.controller.getPlayerById(playerId);
    }

    getAllPlayerDTOs(): PlayerDTO[] {
        return this.controller.getAllPlayers();
    }
}

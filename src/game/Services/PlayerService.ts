import PlayerDTO from "../DTOs/PlayerDTO";
import PlayerController from "../Controllers/PlayerController";
import PlayerView from "../Views/PlayerView";
import BaseService from "./BaseService";

export default class PlayerService extends BaseService<PlayerDTO>{
    private controller: PlayerController;
    private playerViews: PlayerView[] = [];

    constructor(scene: Phaser.Scene, jsonPath: string) {
        super(scene, jsonPath);
        this.controller = new PlayerController();
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

    public async initialize(levelId: number): Promise<void> {
        const data = await this.loadData();
        const players = this.mapPlayers(data);
        players.forEach(player => this.controller.addItem(player));
        const levelPlayers = players.filter(player => player.levelId === levelId);
        if (levelPlayers.length === 0) {
            console.warn(`No players found for levelId: ${levelId}`);
        } else {
            levelPlayers.forEach(player => this.createPlayerView(player));
        }
    }

    public getPlayerDTOById(playerId: number): PlayerDTO | undefined {
        return this.controller.getItemByProperty("playerId",playerId);
    }

    public getAllPlayerDTOs(): PlayerDTO[] {
        return this.controller.getAllItems();
    }
    public createPlayerView(playerData: PlayerDTO): void {
        const playerView = new PlayerView(this.scene, playerData);
        this.playerViews.push(playerView);
    }

    public getAllPlayerViews(): PlayerView[] {
        return this.playerViews;
    }

    public getPlayerViewById(playerId: number): PlayerView | undefined {
        return this.playerViews.find(view => view.playerData.playerId === playerId);
    }
}
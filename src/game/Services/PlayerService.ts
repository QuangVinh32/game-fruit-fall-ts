import PlayerDTO from "../DTOs/PlayerDTO";
import PlayerController from "../Controllers/PlayerController";

export default class PlayerService {
    private jsonPath: string;
    private controller: PlayerController;

    constructor(jsonPath: string) {
        this.jsonPath = jsonPath;
        this.controller = new PlayerController();
    }

    private async loadData(): Promise<any> {
        const response = await fetch(this.jsonPath);
        return await response.json();
    }

    private mapPlayers(data: any): PlayerDTO[] {
        const players = Array.isArray(data.players) ? data.players : [];
        if (!players.length) {
            console.error("Invalid or missing players data:", data.players);
        }

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

    async initialize(levelId: number): Promise<PlayerDTO[]> {
        const data = await this.loadData();
        const players = this.mapPlayers(data);
        players.forEach(player => this.controller.addPlayers(player));
        return players.filter(player => player.levelId === levelId);
    }

    getPlayerDTOById(playerId: number): PlayerDTO | undefined {
        return this.controller.getPlayerById(playerId);
    }

    getAllPlayerDTOs(): PlayerDTO[] {
        return this.controller.getAllPlayers();
    }
}

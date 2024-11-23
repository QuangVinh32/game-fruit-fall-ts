import PlayerDTO  from "../DTOs/PlayerDTO";

export default class PlayerController {
    private players: PlayerDTO[]; 

    constructor() {
        this.players = [];
    }

    addPlayers(dto: PlayerDTO): void {
        this.players.push(dto);
    }

    getAllPlayers(): PlayerDTO[] {
        return this.players;
    }

    getPlayerById(levelId: number): PlayerDTO | undefined {
        return this.players.find(player => player.levelId === levelId);
    }

}
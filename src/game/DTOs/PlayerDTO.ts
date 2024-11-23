export default class PlayerDTO {
    private _playerId: number;
    private _positionX: number;
    private _positionY: number;
    private _width: number;
    private _height: number;
    private _bounce: number;
    private _texture: string;
    private _levelId: number;

	constructor(playerId: number, positionX: number, positionY: number, width: number, height: number, bounce: number, texture: string, levelId: number) {
		this._playerId = playerId;
		this._positionX = positionX;
		this._positionY = positionY;
		this._width = width;
		this._height = height;
        this._bounce = bounce;
        this._texture = texture;
        this._levelId = levelId;
	}

    /**
     * Getter levelId
     * @return {number}
     */
	public get levelId(): number {
		return this._levelId;
	}

    /**
     * Setter levelId
     * @param {number} value
     */
	public set levelId(value: number) {
		this._levelId = value;
	}

 


    /**
     * Getter texture
     * @return {string}
     */
	public get texture(): string {
		return this._texture;
	}

    /**
     * Setter texture
     * @param {string} value
     */
	public set texture(value: string) {
		this._texture = value;
	}

    /**
     * Getter bounce
     * @return {number}
     */
	public get bounce(): number {
		return this._bounce;
	}

    /**
     * Setter bounce
     * @param {number} value
     */
	public set bounce(value: number) {
		this._bounce = value;
	}

    /**
     * Getter playerId
     * @return {number}
     */
	public get playerId(): number {
		return this._playerId;
	}

    /**
     * Getter positionX
     * @return {number}
     */
	public get positionX(): number {
		return this._positionX;
	}

    /**
     * Getter positionY
     * @return {number}
     */
	public get positionY(): number {
		return this._positionY;
	}

    /**
     * Getter width
     * @return {number}
     */
	public get width(): number {
		return this._width;
	}

    /**
     * Getter height
     * @return {number}
     */
	public get height(): number {
		return this._height;
	}

    /**
     * Setter playerId
     * @param {number} value
     */
	public set playerId(value: number) {
		this._playerId = value;
	}

    /**
     * Setter positionX
     * @param {number} value
     */
	public set positionX(value: number) {
		this._positionX = value;
	}

    /**
     * Setter positionY
     * @param {number} value
     */
	public set positionY(value: number) {
		this._positionY = value;
	}

    /**
     * Setter width
     * @param {number} value
     */
	public set width(value: number) {
		this._width = value;
	}

    /**
     * Setter height
     * @param {number} value
     */
	public set height(value: number) {
		this._height = value;
	}



}
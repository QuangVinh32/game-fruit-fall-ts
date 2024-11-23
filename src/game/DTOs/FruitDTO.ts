

export default class FruitDTO {
    private _fruitId: number;
    private _positionX: number;
    private _positionY: number;
    private _width: number;
    private _height: number;
    private _fruitTypeId: number;
    private _levelId: number;


	constructor(fruitId: number, positionX: number, positionY: number, width: number, height: number, fruitTypeId: number,levelId: number) {
		this._fruitId = fruitId;
		this._positionX = positionX;
		this._positionY = positionY;
		this._width = width;
		this._height = height;
		this._fruitTypeId = fruitTypeId;
        this._levelId = levelId
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
     * Getter fruitId
     * @return {number}
     */
	public get fruitId(): number {
		return this._fruitId;
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
     * Getter fruitTypeId
     * @return {number}
     */
	public get fruitTypeId(): number {
		return this._fruitTypeId;
	}

    /**
     * Setter fruitId
     * @param {number} value
     */
	public set fruitId(value: number) {
		this._fruitId = value;
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

    /**
     * Setter fruitTypeId
     * @param {number} value
     */
	public set fruitTypeId(value: number) {
		this._fruitTypeId = value;
	}
    
    


}
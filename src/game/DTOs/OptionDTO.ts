export default class OpitionDTO{
    private _optionId: number;
    private _isAnswer: boolean;
    private _value: number;
    private _positionX: number;
    private _positionY: number;
    private _width: number;
    private _height: number;
    private _questionId: number;



	constructor(optionId: number, isAnswer: boolean, value: number,questionId: number, positionX: number, positionY: number, width: number,height : number) {
		this._optionId = optionId;
		this._isAnswer = isAnswer;
		this._value = value;
        this._questionId = questionId;
        this._positionX = positionX;
        this._positionY = positionY;
        this._width = width;
		this._height = height;
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
     * Getter questionId
     * @return {number}
     */
	public get questionId(): number {
		return this._questionId;
	}

    /**
     * Setter questionId
     * @param {number} value
     */
	public set questionId(value: number) {
		this._questionId = value;
	}


    /**
     * Getter optionId
     * @return {number}
     */
	public get optionId(): number {
		return this._optionId;
	}

    /**
     * Getter isAnswer
     * @return {boolean}
     */
	public get isAnswer(): boolean {
		return this._isAnswer;
	}

    /**
     * Getter value
     * @return {number}
     */
	public get value(): number {
		return this._value;
	}

    /**
     * Setter optionId
     * @param {number} value
     */
	public set optionId(value: number) {
		this._optionId = value;
	}

    /**
     * Setter isAnswer
     * @param {boolean} value
     */
	public set isAnswer(value: boolean) {
		this._isAnswer = value;
	}

    /**
     * Setter value
     * @param {number} value
     */
	public set value(value: number) {
		this._value = value;
	}
    

}
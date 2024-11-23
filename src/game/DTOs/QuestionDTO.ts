export default class QuestionDTO{
    private _questionId: number;
    private _state: boolean;
    private _levelId: number;
	private _text: string;
    private _positionX: number;
    private _positionY: number;

	constructor(questionId: number, state: boolean, levelId: number, text: string, positionX: number, positionY: number) {
		this._questionId = questionId;
		this._state = state;
		this._levelId = levelId;
		this._text = text;
        this._positionX = positionX;
        this._positionY = positionY;
        
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
     * Getter questionId
     * @return {number}
     */
	public get questionId(): number {
		return this._questionId;
	}

    /**
     * Getter state
     * @return {boolean}
     */
	public get state(): boolean {
		return this._state;
	}

    /**
     * Getter levelId
     * @return {number}
     */
	public get levelId(): number {
		return this._levelId;
	}

    /**
     * Getter text
     * @return {string}
     */
	public get text(): string {
		return this._text;
	}

    /**
     * Setter questionId
     * @param {number} value
     */
	public set questionId(value: number) {
		this._questionId = value;
	}

    /**
     * Setter state
     * @param {boolean} value
     */
	public set state(value: boolean) {
		this._state = value;
	}

    /**
     * Setter levelId
     * @param {number} value
     */
	public set levelId(value: number) {
		this._levelId = value;
	}

    /**
     * Setter text
     * @param {string} value
     */
	public set text(value: string) {
		this._text = value;
	}
	
	

}
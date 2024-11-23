export default class FruitTypeDTO{
    private _fruitTypeId: number;
    private _name: string;
    private _texture: string;

	constructor(fruitTypeId: number, name: string, texture: string) {
		this._fruitTypeId = fruitTypeId;
		this._name = name;
        this._texture = texture;
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
     * Getter fruitTypeId
     * @return {number}
     */
	public get fruitTypeId(): number {
		return this._fruitTypeId;
	}

    /**
     * Getter name
     * @return {number}
     */
	public get name(): string {
		return this._name;
	}

    /**
     * Setter fruitTypeId
     * @param {number} value
     */
	public set fruitTypeId(value: number) {
		this._fruitTypeId = value;
	}

    /**
     * Setter name
     * @param {number} value
     */
	public set name(value: string) {
		this._name = value;
	}

}
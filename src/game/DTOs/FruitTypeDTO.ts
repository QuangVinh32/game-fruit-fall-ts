export default class FruitTypeDTO{
    private _id: number;
    private _name: string;
    private _texture: string;
    levelId: number;

	constructor(id: number, name: string, texture: string) {
		this._id = id;
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
	public get id(): number {
		return this._id;
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
	public set id(value: number) {
		this.id = value;
	}

    /**
     * Setter name
     * @param {number} value
     */
	public set name(value: string) {
		this._name = value;
	}

}
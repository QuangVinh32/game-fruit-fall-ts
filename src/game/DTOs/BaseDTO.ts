
export class BaseDTO{
    private _id: number;

	constructor(id: number) {
		this._id = id;
    }

    /**
     * Getter id
     * @return {number}
     */
	public get id(): number {
		return this._id;
	}

    /**
     * Setter id
     * @param {number} value
     */
	public set id(value: number) {
		this._id = value;
	}

    

}

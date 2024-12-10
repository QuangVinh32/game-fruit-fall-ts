export default class BaseDTO {
    protected _idB: number;

    constructor(id: number) {
        this._idB = id;
    }

    /**
     * Getter id
     * @return {number}
     */
    public get idB(): number {
        return this._idB;
    }

    /**
     * Setter id
     * @param {number} value
     */
    public set idB(value: number) {
        this._idB = value;
    }
}

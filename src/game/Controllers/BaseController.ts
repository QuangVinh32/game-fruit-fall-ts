export default class BaseController<T> {
    private items: T[]; // Generic array to store items of type T

    constructor() {
        this.items = [];
    }

    addItem(item: T): void {
        this.items.push(item);
    }

    getAllItems(): T[] {
        return this.items;
    }

    getItemByCondition(predicate: (item: T) => boolean): T | undefined {
        return this.items.find(predicate);
    }
}

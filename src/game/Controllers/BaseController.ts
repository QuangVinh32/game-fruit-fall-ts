export default class BaseController<T> {
    protected items: T[] = [];

    public addItem(item: T): void {
        this.items.push(item);
    }

    public getAllItems(): T[] {
        return this.items;
    }

    public getItemByProperty<K extends keyof T>(key: K, value: T[K]): T | undefined {
        return this.items.find(item => item[key] === value);
    }

}

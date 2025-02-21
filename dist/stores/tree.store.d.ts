import { Store } from "mint";
import { Item } from "../models/Item.model";
declare class TreeStore extends Store {
    showMessage: boolean;
    currentTitle: string;
    currentList: Array<Item>;
    constructor();
}
export declare const treeStore: TreeStore;
export {};

import { Store } from "mint";
import { Item } from "../models/Item.model";
import { IRootData } from "../interfaces/IRootData.interface";
declare class AppStore extends Store {
    rootData: IRootData;
    currentItem: Item | null;
    sessionStorageKey: string | null;
    loaded: boolean;
    currentTitle: string | null;
    constructor();
}
export declare const appStore: AppStore;
export {};

import { MintComponent, Resolver, Store } from "mint";
import { Item } from "../models/Item.model";
import { IData } from "../interfaces/IData.interface";
declare class ListStore extends Store {
    breadcrumbs: boolean;
    dragIndex: number | null;
    listElementRef: HTMLUListElement | null;
    item: Item | IData;
    list: Array<Item>;
    itemOptions: Array<MintComponent>;
    hasList: Resolver<boolean>;
    getTextColour: Resolver<string>;
    selectItem: () => void;
    constructor();
}
export declare const listStore: ListStore;
export {};

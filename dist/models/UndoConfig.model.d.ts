import { Item } from "./Item.model";
import { UndoConfigs } from "../enums/UndoConfigs.enum";
type options = {
    item: Item;
    path: Array<string>;
    items?: never;
} | {
    item?: never;
    path: Array<string>;
    items: Array<Item>;
};
export declare class UndoConfig {
    type: UndoConfigs;
    item: Item;
    path: Array<string>;
    items: Array<Item>;
    constructor(type: UndoConfigs, { item, path, items }: options);
}
export {};

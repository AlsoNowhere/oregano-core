import { Item } from "./Item.model";
import { UndoConfig } from "./UndoConfig.model";
export declare class Undo {
    list: Array<UndoConfig>;
    limit: number;
    constructor(list: Array<UndoConfig>);
    maintainLimit(): void;
    addDelete(item: Item, path: Array<string>): void;
}

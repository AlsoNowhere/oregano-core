import { Item } from "../../models/Item.model";
interface IOutput {
    title: string;
    route: Array<number>;
    path: string;
    isOnTitle: boolean;
}
export declare const searchItems: (list: Array<Item>, value: string, { includeMessage }: {
    includeMessage: boolean;
}, output?: Array<IOutput>, currentRoute?: Array<number>) => IOutput[];
export {};

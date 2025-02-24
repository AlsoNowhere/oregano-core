import { Item } from "../../models/Item.model";
interface IOutput {
    title: string;
    route: Array<number>;
    path: string;
}
export declare const searchItemTags: (list: Array<Item>, value: string, output?: Array<IOutput>, currentRoute?: Array<number>) => IOutput[];
export {};

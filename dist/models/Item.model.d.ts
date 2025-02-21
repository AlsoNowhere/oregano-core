import { Tag } from "./Tag.model";
import { IData } from "../interfaces/IData.interface";
import { THeatmap } from "../types/THeatmap.type";
export declare class Item implements IData {
    title: string;
    message: string;
    colour: string;
    actions: Array<string>;
    items: Array<Item>;
    tags: Array<Tag>;
    index: number;
    createdAt: number;
    heatmap?: THeatmap;
    constructor({ title, message, colour, actions, items, index, createdAt, heatmap, tags, }?: {
        title?: string;
        message?: string;
        colour?: string;
        actions?: Array<string>;
        items?: Array<Item>;
        index?: number;
        createdAt?: number;
        heatmap?: THeatmap;
        tags?: Array<Tag>;
    });
}

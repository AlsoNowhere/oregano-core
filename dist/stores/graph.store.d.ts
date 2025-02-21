import { Store } from "mint";
import { Item } from "../models/Item.model";
declare class GraphStore extends Store {
    currentTitle: string;
    currentList: Array<Item>;
    showGraph: boolean;
    svgElementRef: SVGElement | null;
    constructor();
}
export declare const graphStore: GraphStore;
export {};

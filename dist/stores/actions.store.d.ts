import { Resolver, Store } from "mint";
declare class ActionStore extends Store {
    getTheme: Resolver<string>;
    constructor();
}
export declare const actionStore: ActionStore;
export {};

import { Resolver, Store } from "mint";
declare class MainButtonsStore extends Store {
    mainButtonsElement: HTMLUListElement | null;
    isList: Resolver<boolean>;
    constructor();
}
export declare const mainButtonsStore: MainButtonsStore;
export {};

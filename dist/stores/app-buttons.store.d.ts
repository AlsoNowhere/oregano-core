import { Resolver, Store } from "mint";
declare class AppButtonsStore extends Store {
    appButtonsElement: HTMLUListElement | null;
    isList: Resolver<boolean>;
    constructor();
}
export declare const appButtonsStore: AppButtonsStore;
export {};

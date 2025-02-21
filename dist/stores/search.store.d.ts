import { MintEvent, Resolver, Store } from "mint";
import { Tab } from "thyme";
declare class SearchStore extends Store {
    value: string;
    results: Array<{}>;
    tagSearchResults: Array<{}>;
    formElementRef: HTMLFormElement;
    searchRun: boolean;
    includeMessage: boolean;
    tabs: Array<Tab>;
    currentTab: Tab;
    currentTitle: Resolver<string>;
    showNoItemFound: Resolver<boolean>;
    showNoTabItemFound: Resolver<boolean>;
    fromMessageClass: Resolver<string>;
    update: MintEvent;
    runSearch: MintEvent;
    selectRoute: () => void;
    onCheckIncludeMessage: MintEvent;
    constructor();
}
export declare const searchStore: SearchStore;
export {};

import { MintEvent, Resolver, Store } from "mint";
declare class ImportStore extends Store {
    importValue: string;
    currentTitle: Resolver<string>;
    importFormElement: HTMLFormElement;
    onInput: MintEvent;
    onSubmit: MintEvent<HTMLFormElement>;
    constructor();
}
export declare const importStore: ImportStore;
export {};

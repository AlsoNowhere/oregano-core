import { Store, MintEvent } from "mint";
declare class ExportStore extends Store {
    currentTitle: string;
    currentValue: string;
    onlyItems: boolean;
    formElementRef: HTMLFormElement;
    onChangeOnlyItems: MintEvent<HTMLInputElement>;
    constructor();
}
export declare const exportStore: ExportStore;
export {};

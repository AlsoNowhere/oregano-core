import { MintEvent, Store } from "mint";
import { FieldsetOption } from "thyme";
import { Item } from "../models/Item.model";
import { Tag } from "../models/Tag.model";
import { IRootData } from "../interfaces/IRootData.interface";
declare class ManageStore extends Store {
    manageFormElementRef: HTMLFormElement | null;
    title: string;
    message: string;
    colours: Array<FieldsetOption>;
    currentColour: string;
    tagsValue: string;
    tags: Array<Tag>;
    tagsScope: {};
    toEditMethod: "main-button" | "item-button";
    editItem: IRootData | Item | null;
    setTitle: MintEvent;
    setMessage: MintEvent;
    setColour: MintEvent;
    onSubmit: MintEvent;
    cancel: () => void;
    constructor();
}
export declare const manageStore: ManageStore;
export {};

import { MintEvent } from "mint";
import { Action } from "./Action.model";
type options = {
    label?: string;
    icon?: string;
    title: string;
    id: string;
};
export declare class ActionButton {
    label: string;
    icon: string;
    title: string;
    id: string;
    active: boolean;
    action?: Action;
    onClick: MintEvent;
    constructor({ label, icon, title, id }: options, action?: any);
}
export {};

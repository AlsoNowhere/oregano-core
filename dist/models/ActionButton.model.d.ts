import { MintEvent } from "mint";
import { Action } from "./Action.model";
type TOptions = {
    label?: string;
    icon?: string;
    title: string;
    square?: boolean;
    id: string;
};
export declare class ActionButton {
    label: string;
    icon: string;
    title: string;
    square: boolean;
    id: string;
    active: boolean;
    action?: Action;
    onClick: MintEvent;
    constructor({ label, icon, title, square, id }: TOptions, action?: any);
}
export {};

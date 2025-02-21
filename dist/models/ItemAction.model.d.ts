import { MintEvent } from "mint";
export declare class ItemAction {
    name: string;
    icon: string;
    action: MintEvent;
    constructor(name: string, icon: string, action: MintEvent);
}

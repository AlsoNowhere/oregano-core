import { TAction } from "../types/TAction.type";
import { ActionTypes } from "../enums/ActionTypes.enum";
export declare class Action {
    type: ActionTypes;
    value: TAction | string;
    constructor(type: ActionTypes, value: TAction | string);
}

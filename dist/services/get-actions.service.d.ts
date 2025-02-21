import { TAction } from "../types/TAction.type";
import { ActionTypes } from "../enums/ActionTypes.enum";
export declare const getActions: () => string[];
export declare const getActionAbles: (actions: Array<string>, match: ActionTypes) => (string | TAction)[];

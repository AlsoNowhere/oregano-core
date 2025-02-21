import { UndoConfig } from "../models/UndoConfig.model";
import { ICommonRootData } from "./ICommonRootData.interface";
export interface ISaveData extends ICommonRootData {
    undo: Array<UndoConfig>;
}

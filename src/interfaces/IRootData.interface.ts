import { Undo } from "../models/Undo.model";

import { ICommonRootData } from "./ICommonRootData.interface";

export interface IRootData extends ICommonRootData {
  undo: Undo;
}

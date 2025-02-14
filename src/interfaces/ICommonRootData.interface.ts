import { Item } from "../models/Item.model";

import { IData } from "./IData.interface";

export interface ICommonRootData extends IData {
  root: true;
  timestamp_root: number;
  title: string;
  message: string;
  items: [];
  pasteItems: Array<Item>;
  itemIndex: number;
}

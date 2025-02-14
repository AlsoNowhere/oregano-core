import { Item } from "../models/Item.model";
import { Tag } from "../models/Tag.model";

import { THeatmap } from "../types/THeatmap.type";

export interface IData {
  title: string;
  message: string;
  colour: string;
  actions: Array<string>;
  items: Array<Item>;
  tags: Array<Tag>;
  index: number;
  createdAt: number;
  heatmap?: THeatmap;
}

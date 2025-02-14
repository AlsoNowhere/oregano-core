import { Item } from "./Item.model";
import { UndoConfig } from "./UndoConfig.model";

import { UndoConfigs } from "../enums/UndoConfigs.enum";

export class Undo {
  list: Array<UndoConfig>;
  limit: number;

  constructor(list: Array<UndoConfig>) {
    this.limit = 1;
    this.list = list;
  }

  maintainLimit() {
    if (this.list.length > this.limit) {
      this.list.pop();
    }
  }

  addDelete(item: Item, path: Array<string>) {
    this.list.push(
      new UndoConfig(UndoConfigs.delete, {
        item,
        path,
      })
    );
    this.maintainLimit();
  }
}

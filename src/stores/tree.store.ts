import { refresh, Resolver, Store } from "mint";

import { listStore } from "./list.store";

import { Item } from "../models/Item.model";

class TreeStore extends Store {
  showMessage: boolean;
  currentTitle: string;
  currentList: Array<Item>;

  constructor() {
    super({
      showMessage: false,

      currentTitle: new Resolver(() => {
        return listStore.item.title;
      }),

      currentList: new Resolver(() => {
        return listStore.item.items;
      }),

      toggleShowMessage() {
        treeStore.showMessage = !treeStore.showMessage;
        refresh(treeStore);
      },
    });
  }
}

export const treeStore = new TreeStore();

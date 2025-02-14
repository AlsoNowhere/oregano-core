import { Resolver, Store } from "mint";

import { Item } from "../models/Item.model";

import { IRootData } from "../interfaces/IRootData.interface";

class AppStore extends Store {
  rootData: IRootData;
  currentItem: Item | null;
  sessionStorageKey: string | null;
  loaded: boolean;
  currentTitle: string | null;

  constructor() {
    super({
      rootData: null,
      currentItem: null,
      sessionStorageKey: null,
      loaded: false,

      currentTitle: new Resolver(function () {
        return appStore.currentItem?.title;
      }),
    });
  }
}

export const appStore = new AppStore();

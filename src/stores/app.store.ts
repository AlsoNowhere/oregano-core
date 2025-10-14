import { Resolver, Store } from "mint";

import { Item } from "../models/Item.model";

import { IRootData } from "../interfaces/IRootData.interface";
import { IActiveSearch } from "../interfaces/IActiveSearch.interface";

import { oreganoSettings } from "../data/oregano-settings.data";

class AppStore extends Store {
  rootData: IRootData;
  currentItem: Item | null;
  loaded: boolean;
  activeSearch: null | IActiveSearch;
  sessionStorageKey: string | null;
  currentTitle: string | null;

  constructor() {
    super({
      rootData: null,
      currentItem: null,
      loaded: false,
      activeSearch: null,

      sessionStorageKey: new Resolver(() => oreganoSettings.sessionStorageKey),
      currentTitle: new Resolver(function () {
        return appStore.currentItem?.title;
      }),
    });
  }
}

export const appStore = new AppStore();

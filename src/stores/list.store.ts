import { MintComponent, Resolver, Store, refresh } from "mint";

import { path, wait } from "sage";

import { HasMessage } from "../components/pages/list/list-items/HasMessage.component";
import { ItemCount } from "../components/pages/list/list-items/ItemCount.component";
import { EditListItem } from "../components/pages/list/list-items/EditListItem.component";
import { CutListItem } from "../components/pages/list/list-items/CutListItem.component";
import { DeleteListItem } from "../components/pages/list/list-items/DeleteListItem.component";

import { getItem } from "../services/get-item.service";

import { saveData } from "../logic/load-save.logic";
import { getTextColour } from "../logic/list-items/get-text-colour.logic";

import { appStore } from "./app.store";

import { Item } from "../models/Item.model";

import { IData } from "../interfaces/IData.interface";

import { oreganoSettings } from "../data/oregano-settings.data";

class ListStore extends Store {
  breadcrumbs: boolean;
  dragIndex: number | null;
  listElementRef: HTMLUListElement | null;
  item: Item | IData;
  list: Array<Item>;
  itemOptions: Array<MintComponent>;
  hasList: Resolver<boolean>;
  getTextColour: Resolver<string>;

  selectItem: () => void;

  constructor() {
    super({
      breadcrumbs: new Resolver(() => oreganoSettings.breadcrumbs),
      dragIndex: null,

      listElementRef: null,

      item: new Resolver(() => {
        const item = getItem(path.get().slice(1));
        if (item === null) return {};
        return item;
      }),

      list: new Resolver(() => {
        const item = getItem(path.get().slice(1));
        if (item === null) return [];
        return item.items;
      }),
      itemOptions: [
        HasMessage,
        ItemCount,
        EditListItem,
        CutListItem,
        DeleteListItem,
      ],

      hasList: new Resolver(() => listStore.list.length > 0),

      getTextColour: new Resolver(function () {
        return getTextColour(this.colour);
      }),

      messageClass: new Resolver(() =>
        listStore.item.actions?.includes("message-to-side")
          ? "grid-6"
          : "grid-12"
      ),

      selectItem: async function () {
        await wait();
        refresh(appStore);
      },

      onDragStart() {
        listStore.dragIndex = this._i;
      },

      onDragOver(event) {
        event.preventDefault();
      },

      onDrop(_, __, scope) {
        const index = scope._i;
        const [holdItem] = listStore.list.splice(listStore.dragIndex, 1);
        listStore.list.splice(index, 0, holdItem);
        listStore.dragIndex = null;
        saveData();
        refresh(listStore);
      },
    });
  }
}

export const listStore = new ListStore();

import { Resolver, Store, MintEvent, refresh } from "mint";

import { wait } from "sage";

import { listStore } from "./list.store";

import { Item } from "../models/Item.model";

import { colours } from "../data/colours.data";

const simiplifyData = (data: Item) => {
  data = JSON.parse(JSON.stringify(data));
  if (data.message === "") delete data.message;
  if (data.colour === colours[0].colour) delete data.colour;
  data.items.forEach(simiplifyData);
  return data;
};

class ExportStore extends Store {
  currentTitle: string;
  currentValue: string;
  onlyItems: boolean;
  formElementRef: HTMLFormElement;

  onChangeOnlyItems: MintEvent<HTMLInputElement>;

  constructor() {
    super({
      currentTitle: new Resolver<string>(() => {
        return listStore.item.title;
      }),
      currentValue: new Resolver<string>(() => {
        if (exportStore.onlyItems) {
          const { items } = listStore.item;
          const _items = items.map(simiplifyData);
          return JSON.stringify(_items);
        }
        const { item } = listStore;
        const _item = simiplifyData(item);
        return JSON.stringify(_item);
      }),
      onlyItems: false,
      formElementRef: null,
      oninsert: async () => {
        const form = exportStore.formElementRef;
        await wait();
        const input = form["export-data"];
        input.select();
      },
      onChangeOnlyItems: (_, element) => {
        exportStore.onlyItems = element.checked;
        refresh(exportStore);
      },
    });
  }
}

export const exportStore = new ExportStore();

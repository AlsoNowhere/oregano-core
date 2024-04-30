import { IStore, Resolver, Store, MintEvent, refresh } from "mint";

import { path, wait } from "sage";

import { getItem } from "../services/get-item.service";

export const exportStore = new Store({
  currentTitle: new Resolver<string>(() => {
    const item = getItem(path.get().slice(1));
    if (item === null) return "";
    return item.title;
  }),

  currentValue: new Resolver<string>(() => {
    const item = getItem(path.get().slice(1));
    if (item === null) return "";
    if (exportStore.onlyItems) {
      return JSON.stringify(item.items);
    }
    return JSON.stringify(item);
  }),

  onlyItems: false,
  formElementRef: null,

  oninsert: async () => {
    const form = exportStore.formElementRef;
    await wait();
    const input = form["export-data"];
    input.select();
  },

  onChangeOnlyItems: ((_, element) => {
    exportStore.onlyItems = element.checked;
    refresh(exportStore);
  }) as MintEvent<HTMLInputElement>,
}) as IStore & {
  currentTitle: string;
  currentValue: string;
  onlyItems: boolean;
  formElementRef: HTMLFormElement;

  onChangeOnlyItems: () => void;
};

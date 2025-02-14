import { MintEvent, Resolver, Store } from "mint";

import { path, toast, wait } from "sage";

import { backToList } from "../services/back-to-list.service";
import { getItem } from "../services/get-item.service";

import { saveData } from "../logic/load-save.logic";

import { Item } from "../models/Item.model";

import { IData } from "../interfaces/IData.interface";

import { colours } from "../data/colours.data";

const extractData = (object) => {
  const obj = new Item();
  const { title, message, items, colour } = object;
  // ** Be specific about properties to catch errors.
  obj.title = title ?? "";
  obj.message = message ?? "";
  items && (obj.items = items.map(extractData));
  obj.colour = colour ?? colours[0].colour;
  return obj;
};

class ImportStore extends Store {
  importValue: string;
  currentTitle: Resolver<string>;
  importFormElement: HTMLFormElement;
  onInput: MintEvent;
  onSubmit: MintEvent<HTMLFormElement>;

  constructor() {
    super({
      importValue: "",

      currentTitle: new Resolver(() => {
        const item = getItem(path.get().slice(1));
        if (item === null) return "";
        return item.title;
      }),

      importFormElement: null,

      oninsert() {
        importStore.importValue = "";
        (async () => {
          await wait();
          this.importFormElement?.["importValue"]?.focus();
        })();
      },

      onInput(_, element) {
        importStore.importValue = element.value;
      },

      onSubmit(event) {
        event.preventDefault();
        if (importStore.importValue === "") {
          toast("No data input", "orange");
          return;
        }
        try {
          const parsed: IData = JSON.parse(importStore.importValue);
          const currentItem = getItem(path.get().slice(1));
          if (parsed instanceof Array) {
            const resolved = parsed.map(extractData);
            currentItem.items.push(...resolved);
          } else {
            const obj = extractData(parsed);
            currentItem.items.push(obj);
          }
          saveData();
          backToList();
        } catch (error) {
          console.error(error);
          toast("Could not parse this data", "tomato");
        }
      },
    });
  }
}

export const importStore = new ImportStore();

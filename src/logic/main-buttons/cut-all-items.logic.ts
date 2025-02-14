import { refresh } from "mint";

import { saveData } from "../load-save.logic";

import { appStore } from "../../stores/app.store";
import { listStore } from "../../stores/list.store";
import { mainButtonsStore } from "../../stores/main-buttons.store";

export const cutAllItems = () => {
  const { item } = listStore;
  const { items } = item;

  appStore.rootData.pasteItems.push(...items);
  item.items.length = 0;

  saveData();
  refresh(mainButtonsStore);
  refresh(listStore);
};

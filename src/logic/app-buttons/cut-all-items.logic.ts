import { refresh } from "mint";

import { saveData } from "../load-save.logic";

import { appStore } from "../../stores/app.store";
import { listStore } from "../../stores/list.store";
import { appButtonsStore } from "../../stores/app-buttons.store";

export const cutAllItems = () => {
  const { item } = listStore;
  const { items } = item;

  appStore.rootData.pasteItems.push(...items);
  item.items.length = 0;

  saveData();
  refresh(appButtonsStore);
  refresh(listStore);
};

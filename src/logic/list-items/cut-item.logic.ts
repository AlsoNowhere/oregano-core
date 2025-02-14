import { refresh } from "mint";

import { saveData } from "../load-save.logic";

import { appStore } from "../../stores/app.store";
import { mainButtonsStore } from "../../stores/main-buttons.store";
import { listStore } from "../../stores/list.store";

export const cutItem = (event, _, scope) => {
  event.stopPropagation();
  const { index } = scope;
  const item = listStore.list[index];
  appStore.rootData.pasteItems.push(item);
  listStore.list.splice(index, 1);
  saveData();
  refresh(mainButtonsStore);
  refresh(listStore);
};

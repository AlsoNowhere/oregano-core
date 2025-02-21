import { refresh } from "mint";

import { saveData } from "../load-save.logic";

import { appStore } from "../../stores/app.store";
import { appButtonsStore } from "../../stores/app-buttons.store";
import { listStore } from "../../stores/list.store";

export const pasteItems = () => {
  const { pasteItems } = appStore.rootData;

  listStore.list.push(...pasteItems);
  pasteItems.length = 0;

  saveData();
  refresh(appButtonsStore);
  refresh(listStore);
};

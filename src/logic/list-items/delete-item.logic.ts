import { refresh } from "mint";

import { path } from "sage";

import { saveData } from "../load-save.logic";

import { appStore } from "../../stores/app.store";
import { listStore } from "../../stores/list.store";

export const deleteItem = (event, _, scope) => {
  event.stopPropagation();
  const { index } = scope;
  const item = listStore.list[index];
  listStore.list.splice(index, 1);
  appStore.rootData.undo.addDelete(item, path.get());
  saveData();
  refresh(listStore);
};

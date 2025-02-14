import { refresh } from "mint";

import { path } from "sage";

import { listStore } from "../../stores/list.store";
import { manageStore } from "../../stores/manage.store";
import { appStore } from "../../stores/app.store";

export const editItem = (event, _, scope) => {
  event.stopPropagation();
  const { index } = scope;
  manageStore.editItem = listStore.list[index];
  manageStore.toEditMethod = "item-button";
  path.set(["manage", ...path.get().slice(1), index]);
  refresh(appStore);
};

import { refresh } from "mint";

import { path } from "sage";

import { listStore } from "../../stores/list.store";
import { manageStore } from "../../stores/manage.store";
import { appStore } from "../../stores/app.store";

import { Item } from "../../models/Item.model";

import { IRootData } from "../../interfaces/IRootData.interface";

export const editItem = () => {
  if (
    !(listStore.item instanceof Item) &&
    (listStore.item as IRootData).root !== true
  )
    return;

  manageStore.editItem = listStore.item;
  path.set(["manage", ...path.get().slice(1)]);
  manageStore.toEditMethod = "main-button";

  refresh(appStore);
};

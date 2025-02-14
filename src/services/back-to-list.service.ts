import { refresh } from "mint";

import { changePage } from "./change-page.service";

import { appStore } from "../stores/app.store";
import { manageStore } from "../stores/manage.store";

export const backToList = () => {
  manageStore.editItem = null;
  changePage("list");
  refresh(appStore);
};

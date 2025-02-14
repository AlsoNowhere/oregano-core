import { refresh } from "mint";

import { changePage } from "../../services/change-page.service";

import { appStore } from "../../stores/app.store";

export const addItem = () => {
  changePage("manage");
  refresh(appStore);
};

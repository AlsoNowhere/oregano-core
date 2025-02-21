import { refresh } from "mint";

import { path } from "sage";

import { appButtonsStore } from "../../stores/app-buttons.store";
import { listStore } from "../../stores/list.store";

export const upToRoot = () => {
  path.set(path.get().slice(0, 1));
  refresh(appButtonsStore);
  refresh(listStore);
};

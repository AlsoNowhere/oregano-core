import { refresh } from "mint";

import { path } from "sage";

import { mainButtonsStore } from "../../stores/main-buttons.store";
import { listStore } from "../../stores/list.store";

export const upToRoot = () => {
  path.set(path.get().slice(0, 1));
  refresh(mainButtonsStore);
  refresh(listStore);
};

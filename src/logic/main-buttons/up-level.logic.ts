import { refresh } from "mint";

import { path } from "sage";

import { appStore } from "../../stores/app.store";

export const upLevel = () => {
  path.set(path.get().slice(0, path.get().length - 1));
  refresh(appStore);
};

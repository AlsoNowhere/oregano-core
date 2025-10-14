import { path } from "sage";

import { appStore } from "../../stores/app.store";
import { refresh } from "mint";

export const returnToSearch = () => {
  const { activeSearch } = appStore;
  if (activeSearch === null) return;
  path.set(activeSearch.route);
  refresh(appStore);
};

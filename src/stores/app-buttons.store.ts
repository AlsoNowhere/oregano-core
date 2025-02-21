import { Resolver, Store } from "mint";

import { path } from "sage";

class AppButtonsStore extends Store {
  appButtonsElement: HTMLUListElement | null;
  isList: Resolver<boolean>;

  constructor() {
    super({
      appButtonsElement: null,

      isList: new Resolver(() => path.get().at(0) === "list"),
    });
  }
}

export const appButtonsStore = new AppButtonsStore();

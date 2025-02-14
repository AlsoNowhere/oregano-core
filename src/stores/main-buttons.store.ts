import { Resolver, Store } from "mint";

import { path } from "sage";

class MainButtonsStore extends Store {
  mainButtonsElement: HTMLUListElement | null;
  isList: Resolver<boolean>;

  constructor() {
    super({
      mainButtonsElement: null,

      isList: new Resolver(() => path.get().at(0) === "list"),
    });
  }
}

export const mainButtonsStore = new MainButtonsStore();

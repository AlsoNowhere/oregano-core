import { Resolver, Store } from "mint";

class ActionStore extends Store {
  getTheme: Resolver<string>;

  constructor() {
    super({
      getTheme: new Resolver(function () {
        return this.active ? "blueberry" : "snow";
      }),
    });
  }
}

export const actionStore = new ActionStore();

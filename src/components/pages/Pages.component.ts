import { component, node, mIf, MintScope, Resolver } from "mint";

import { appStore } from "../../stores/app.store";

class PagesComponent extends MintScope {
  loaded: Resolver<boolean>;

  constructor() {
    super();

    this.loaded = new Resolver(() => appStore.loaded);
  }
}

export const Pages = component(
  "div",
  PagesComponent,
  { class: "pages" },
  node("div", { ...mIf("loaded") }, "_children")
);

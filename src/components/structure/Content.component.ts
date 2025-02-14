import { component, MintScope, Resolver } from "mint";

import { appStore } from "../../stores/app.store";

class ContentComponent extends MintScope {
  loaded: Resolver;


  constructor() {
    super();

    this.loaded = new Resolver(() => appStore.loaded);

  }
}

export const Content = component(
  "div",
  ContentComponent,
  {
    class: "main-content",
  },
  "_children"
);

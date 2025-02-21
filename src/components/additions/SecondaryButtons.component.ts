import { MintScope, Resolver, component, div, mIf } from "mint";

import { appButtonsStore } from "../../stores/app-buttons.store";

class SecondaryButtonsComponent extends MintScope {
  isList: Resolver;

  constructor() {
    super();

    this.isList = new Resolver(() => appButtonsStore.isList);
  }
}

export const SecondaryButtons = component(
  "div",
  SecondaryButtonsComponent,
  null,
  [
    div(
      {
        mIf: mIf("isList"),
        class: "list-page__main-buttons",
      },
      "_children"
    ),
  ]
);

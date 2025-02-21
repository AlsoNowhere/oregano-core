import { MintScope, component, div, mIf, mRef, node } from "mint";

import { AltButtons } from "./app-buttons/AltButtons.component";

import { appButtonsStore } from "../../stores/app-buttons.store";

class PrimaryButtonsComponent extends MintScope {
  constructor() {
    super();

    appButtonsStore.connect(this);
  }
}

export const PrimaryButtons = component("div", PrimaryButtonsComponent, null, [
  div(
    {
      mIf: mIf("isList"),
      mRef: mRef("appButtonsElement"),
      class: "list-page__main-buttons",
    },
    "_children"
  ),
  node(AltButtons, { mIf: mIf("!isList") }),
]);

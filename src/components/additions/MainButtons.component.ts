import { MintScope, component, div, mIf, mRef, node } from "mint";

import { AltButtons } from "./main-buttons/AltButtons.component";

import { mainButtonsStore } from "../../stores/main-buttons.store";

class MainButtonsComponent extends MintScope {
  constructor() {
    super();

    mainButtonsStore.connect(this);
  }
}

export const MainButtons = component("div", MainButtonsComponent, null, [
  div(
    {
      mIf: mIf("isList"),
      mRef: mRef("mainButtonsElement"),
      class: "list-page__main-buttons",
    },
    "_children"
  ),
  node(AltButtons, { mIf: mIf("!isList") }),
]);

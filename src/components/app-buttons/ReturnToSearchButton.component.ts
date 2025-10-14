import { node, component, MintScope, Resolver, mIf, mExtend } from "mint";

import { Button } from "thyme";

import { returnToSearch } from "../../logic/app-buttons/return-to-search.logic";

import { appStore } from "../../stores/app.store";

import { appButtonProps } from "../../data/app-button-props.data";

class ReturnToSearchButtonComponent extends MintScope {
  showReturnToSearch: Resolver<boolean>;
  returnToSearch: () => void;

  constructor() {
    super();

    this.showReturnToSearch = new Resolver(() => !!appStore.activeSearch);

    this.returnToSearch = returnToSearch;
  }
}

export const ReturnToSearchButton = component(
  "<>",
  ReturnToSearchButtonComponent,
  null,
  node(Button, {
    mIf: mIf("showReturnToSearch"),
    theme: "blueberry",
    icon: "arrow-left",
    extraButtonLabel: [node("span", { class: "fa fa-search" })],
    title: "Return to search",
    id: "return-to-search",
    mExtend: mExtend(appButtonProps),
    "[onClick]": "returnToSearch",
  }),
);

import { component, mExtend, MintEvent, MintScope, node, refresh } from "mint";

import { path } from "sage";

import { Button } from "thyme";

import { appStore } from "../../stores/app.store";

import { mainButtonProps } from "../../data/main-button-props.data";

class SearchSecondaryButtonComponent extends MintScope {
  openSearch: MintEvent;

  constructor() {
    super();

    this.openSearch = function () {
      path.set(["search", ...path.get().slice(1)]);
      refresh(appStore);
    };
  }
}

export const SearchSecondaryButton = component(
  "<>",
  SearchSecondaryButtonComponent,
  null,
  node(Button, {
    theme: "blueberry",
    icon: "search",
    title: "Search",
    mExtend: mExtend(mainButtonProps),
    "[onClick]": "openSearch",
  })
);

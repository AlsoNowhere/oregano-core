import { component, mExtend, MintEvent, MintScope, node, refresh } from "mint";

import { path } from "sage";

import { Button } from "thyme";

import { appStore } from "../../stores/app.store";

import { appButtonProps } from "../../data/app-button-props.data";

class SearchAppButtonComponent extends MintScope {
  openSearch: MintEvent;

  constructor() {
    super();

    this.openSearch = function () {
      path.set(["search", ...path.get().slice(1)]);
      refresh(appStore);
    };
  }
}

export const SearchAppButton = component(
  "<>",
  SearchAppButtonComponent,
  null,
  node(Button, {
    theme: "blueberry",
    icon: "search",
    title: "Search",
    mExtend: mExtend(appButtonProps),
    "[onClick]": "openSearch",
  })
);

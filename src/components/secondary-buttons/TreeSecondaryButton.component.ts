import { component, mExtend, MintEvent, MintScope, node, refresh } from "mint";

import { path } from "sage";

import { Button } from "thyme";

import { appStore } from "../../stores/app.store";

import { mainButtonProps } from "../../data/main-button-props.data";

class TreeSecondaryButtonComponent extends MintScope {
  openTreeView: MintEvent;

  constructor() {
    super();

    this.openTreeView = function () {
      path.set(["tree", ...path.get().slice(1)]);
      refresh(appStore);
    };
  }
}

export const TreeSecondaryButton = component(
  "<>",
  TreeSecondaryButtonComponent,
  null,
  node(Button, {
    theme: "snow",
    icon: "list",
    title: "Show tree view",
    id: "tree-button",
    mExtend: mExtend(mainButtonProps),
    "[onClick]": "openTreeView",
  })
);

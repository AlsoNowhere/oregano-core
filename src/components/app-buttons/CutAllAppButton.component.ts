import { node, component, MintScope, mExtend } from "mint";

import { Button } from "thyme";

import { cutAllItems } from "../../logic/app-buttons/cut-all-items.logic";

import { appButtonProps } from "../../data/app-button-props.data";

class CutAllAppButtonComponent extends MintScope {
  cutAllItems: () => void;

  constructor() {
    super();

    this.cutAllItems = cutAllItems;
  }
}

export const CutAllAppButton = component(
  "<>",
  CutAllAppButtonComponent,
  null,
  node(Button, {
    theme: "orange",
    icon: "scissors",
    title: "Cut all items",
    id: "cut-all-item-button",
    mExtend: mExtend(appButtonProps),
    "[onClick]": "cutAllItems",
  })
);

import { node, component, MintScope, mExtend } from "mint";

import { Button } from "thyme";

import { cutAllItems } from "../../logic/main-buttons/cut-all-items.logic";

import { mainButtonProps } from "../../data/main-button-props.data";

class CutAllMainButtonComponent extends MintScope {
  cutAllItems: () => void;

  constructor() {
    super();

    this.cutAllItems = cutAllItems;
  }
}

export const CutAllMainButton = component(
  "<>",
  CutAllMainButtonComponent,
  null,
  node(Button, {
    theme: "orange",
    icon: "scissors",
    title: "Cut all items",
    id: "cut-all-item-button",
    mExtend: mExtend(mainButtonProps),
    "[onClick]": "cutAllItems",
  })
);

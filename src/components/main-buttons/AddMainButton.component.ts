import { node, component, MintScope } from "mint";

import { Button, TButton } from "thyme";

import { addItem } from "../../logic/main-buttons/add-item.logic";

class AddMainButtonComponent extends MintScope {
  addItem: () => void;

  constructor() {
    super();

    this.addItem = addItem;
  }
}

export const AddMainButton = component(
  "<>",
  AddMainButtonComponent,
  {},
  node<TButton>(Button, {
    theme: "blueberry",
    icon: "plus",
    title: "Add",
    large: true,
    square: true,
    class: "main-button--add margin-right-small",
    id: "add-button",
    "[onClick]": "addItem",
  })
);

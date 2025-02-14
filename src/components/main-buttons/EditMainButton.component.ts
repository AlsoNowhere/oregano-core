import { node, component, MintScope, mExtend } from "mint";

import { Button } from "thyme";

import { editItem } from "../../logic/main-buttons/edit-item.logic";

import { mainButtonProps } from "../../data/main-button-props.data";

class EditMainButtonComponent extends MintScope {
  editItem: () => void;

  constructor() {
    super();

    this.editItem = editItem;
  }
}

export const EditMainButton = component(
  "<>",
  EditMainButtonComponent,
  null,
  node(Button, {
    theme: "apple",
    icon: "pencil",
    title: "Edit this item",
    mExtend: mExtend(mainButtonProps),
    "[onClick]": "editItem",
  })
);

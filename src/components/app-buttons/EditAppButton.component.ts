import { node, component, MintScope, mExtend } from "mint";

import { Button } from "thyme";

import { editItem } from "../../logic/app-buttons/edit-item.logic";

import { appButtonProps } from "../../data/app-button-props.data";

class EditAppButtonComponent extends MintScope {
  editItem: () => void;

  constructor() {
    super();

    this.editItem = editItem;
  }
}

export const EditAppButton = component(
  "<>",
  EditAppButtonComponent,
  null,
  node(Button, {
    theme: "apple",
    icon: "pencil",
    title: "Edit this item",
    mExtend: mExtend(appButtonProps),
    "[onClick]": "editItem",
  })
);

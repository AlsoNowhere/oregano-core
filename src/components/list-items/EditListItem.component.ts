import { component, MintEvent, MintScope, node } from "mint";

import { editItem } from "../../logic/list-items/edit-item.logic";

import { ListItem } from "../common/ListItem.component";

class EditListItemComponent extends MintScope {
  editItem: MintEvent;

  constructor() {
    super();

    this.editItem = editItem;
  }
}

export const EditListItem = component(
  "<>",
  EditListItemComponent,
  null,
  node(ListItem, {
    icon: "pencil",
    "[onClick]": "editItem",
    "[index]": "index",
  })
);

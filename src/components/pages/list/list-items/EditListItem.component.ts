import { component, MintEvent, MintScope, node } from "mint";

import { ListItem } from "../common/ListItem.component";

import { editItem } from "../../../../logic/list-items/edit-item.logic";

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

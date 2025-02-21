import { component, MintEvent, MintScope, node } from "mint";

import { ListItem } from "../common/ListItem.component";

import { deleteItem } from "../../../../logic/list-items/delete-item.logic";

class DeleteListItemComponent extends MintScope {
  deleteItem: MintEvent;

  constructor() {
    super();

    this.deleteItem = deleteItem;
  }
}

export const DeleteListItem = component(
  "<>",
  DeleteListItemComponent,
  null,
  node(ListItem, {
    icon: "trash-o",
    "[onClick]": "deleteItem",
    "[index]": "index",
  })
);

import { component, MintEvent, MintScope, node } from "mint";

import { deleteItem } from "../../logic/list-items/delete-item.logic";

import { ListItem } from "../common/ListItem.component";

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

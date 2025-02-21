import { component, MintEvent, MintScope, node } from "mint";

import { cutItem } from "../../../../logic/list-items/cut-item.logic";

import { ListItem } from "../common/ListItem.component";

class CutListItemComponent extends MintScope {
  cutItem: MintEvent;

  constructor() {
    super();

    this.cutItem = cutItem;
  }
}

export const CutListItem = component(
  "<>",
  CutListItemComponent,
  null,
  node(ListItem, {
    icon: "scissors",
    "[onClick]": "cutItem",
    "[index]": "index",
  })
);

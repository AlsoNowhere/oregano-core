import { component, MintScope, node, Resolver } from "mint";

import { Button } from "thyme";

import { styles } from "sage";

import { getTextColour } from "../../logic/list-items/get-text-colour.logic";

import { listStore } from "../../stores/list.store";

class ListItemComponent extends MintScope {
  style: Resolver<string>;

  constructor() {
    super();

    this.style = new Resolver(function () {
      return styles({
        color: getTextColour(listStore.list[this.index].colour),
      });
    });
  }
}

export const ListItem = component(
  "<>",
  ListItemComponent,
  null,
  node(Button, {
    theme: "empty",
    "[icon]": "icon",
    square: true,
    class: "list-page__item-button",
    "[onClick]": "onClick",
    "[index]": "index",
  })
);

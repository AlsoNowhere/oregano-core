import { component, mFor, MintScope, node, Resolver } from "mint";

import { Button } from "thyme";

import { ActionButton } from "../../../models/ActionButton.model";

import { actionButtons } from "../../../data/action-buttons.data";

class ActionsComponent extends MintScope {
  actionButtons: Array<ActionButton>;
  getTheme: Resolver<string>;

  constructor() {
    super();

    this.actionButtons = actionButtons;

    this.getTheme = new Resolver(function () {
      return this.active ? "blueberry" : "snow";
    });
  }
}

export const Actions = component(
  "ul",
  ActionsComponent,
  { class: "list flex margin-bottom" },
  node(
    "li",
    {
      mFor: mFor("actionButtons"),
      mKey: "id",
    },
    node(Button, {
      "[theme]": "getTheme",
      "[icon]": "icon",
      "[label]": "label",
      "[title]": "title",
      square: true,
      "[onClick]": "onClick",
      "[id]": "id",
    })
  )
);

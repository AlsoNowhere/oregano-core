import { component, mFor, MintScope, node } from "mint";

import { Button } from "thyme";

import { actionStore } from "../../../stores/actions.store";

import { ActionButton } from "../../../models/ActionButton.model";

import { actionButtons } from "../../../data/action-buttons.data";

class ActionsComponent extends MintScope {
  actionButtons: Array<ActionButton>;

  constructor() {
    super();

    this.actionButtons = actionButtons;

    actionStore.connect(this);
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
      class: "margin-right-small",
    },
    node(Button, {
      "[theme]": "getTheme",
      "[icon]": "icon",
      "[label]": "label",
      "[title]": "title",
      "[square]": "square",
      "[onClick]": "onClick",
      "[id]": "id",
    })
  )
);

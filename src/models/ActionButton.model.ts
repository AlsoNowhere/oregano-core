import { MintEvent, refresh } from "mint";

import { manageStore } from "../stores/manage.store";

import { Action } from "./Action.model";

import { actionButtons } from "../data/action-buttons.data";

type options = {
  label?: string;
  icon?: string;
  title: string;
  id: string;
};

export class ActionButton {
  label: string;
  icon: string;
  title: string;
  id: string;
  active: boolean;
  action?: Action;
  onClick: MintEvent;

  constructor({ label, icon, title, id }: options, action?) {
    this.label = label;
    this.icon = icon;
    this.title = title;
    this.action = action;
    this.onClick = function () {
      const buttonScope = this;
      const actionButton = actionButtons.find(
        ({ id }) => id === buttonScope.id
      );
      actionButton.active = !actionButton.active;
      refresh(manageStore);
    };
    this.id = id;
    this.active = false;
  }
}

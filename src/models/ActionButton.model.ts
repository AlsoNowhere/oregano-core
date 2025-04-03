import { MintEvent, refresh } from "mint";

import { actionStore } from "../stores/actions.store";

import { Action } from "./Action.model";

import { actionButtons } from "../data/action-buttons.data";

type TOptions = {
  label?: string;
  icon?: string;
  title: string;
  square?: boolean;
  id: string;
};

export class ActionButton {
  label: string;
  icon: string;
  title: string;
  square: boolean;
  id: string;
  active: boolean;
  action?: Action;
  onClick: MintEvent;

  constructor({ label, icon, title, square = true, id }: TOptions, action?) {
    this.label = label;
    this.icon = icon;
    this.title = title;
    this.square = square;
    this.action = action;
    this.onClick = function () {
      const buttonScope = this;
      const actionButton = actionButtons.find(
        ({ id }) => id === buttonScope.id
      );
      actionButton.active = !actionButton.active;
      refresh(actionStore);
    };
    this.id = id;
    this.active = false;
  }
}

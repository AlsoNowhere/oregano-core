import { MintEvent } from "mint";

export class ItemAction {
  name: string;
  icon: string;
  action: MintEvent;

  constructor(name: string, icon: string, action: MintEvent) {
    this.name = name;
    this.icon = icon;
    this.action = action;
  }
}

import { IStore } from "mint";

import { ActionButton } from "../models/ActionButton.model";

export const site: {
  actionButtons: Array<ActionButton>;
  manageStore: IStore | null;
} = {
  actionButtons: null,
  manageStore: null,
};

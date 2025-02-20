import { Action } from "../models/Action.model";
import { ActionButton } from "../models/ActionButton.model";

import { ActionTypes } from "../enums/ActionTypes.enum";

export const actionButtons = [
  new ActionButton(
    { icon: "list", title: "Heatmap", id: "heatmap" },
    new Action(ActionTypes.init, (item) => {
      if (item.heatmap === undefined) {
        item.heatmap = {};
      }
    })
  ),
  new ActionButton(
    { icon: "sort-numeric-asc", title: "List add order", id: "list-order" },
    new Action(ActionTypes["add-to-list"], (currentItem, newItem) => {
      currentItem.items.unshift(newItem);
    })
  ),
  new ActionButton(
    {
      icon: "level-up",
      title: "Large font size",
      id: "large-font",
    },
    new Action(ActionTypes.style, "font-size: 1.5rem;")
  ),
  new ActionButton(
    {
      label: "B",
      title: "Bold font",
      id: "bold-font",
    },
    new Action(ActionTypes.style, "font-weight: bold;")
  ),
  new ActionButton({
    icon: "line-chart",
    title: "Has charts",
    id: "charts",
  }),
  new ActionButton({
    icon: "clone",
    title: "Message to side",
    id: "message-to-side",
  }),
];

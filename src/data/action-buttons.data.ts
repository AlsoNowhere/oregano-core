import { Action } from "../models/Action.model";
import { ActionButton } from "../models/ActionButton.model";

import { ActionTypes } from "../enums/ActionTypes.enum";

export const actionButtons = [
  new ActionButton({
    icon: "clone",
    label: "M",
    title: "Message to side",
    square: false,
    id: "message-to-side",
  }),

  new ActionButton(
    {
      icon: "sort-numeric-desc",
      title: "Items added to top",
      id: "list-order",
    },
    new Action(ActionTypes["add-to-list"], (currentItem, newItem) => {
      currentItem.items.unshift(newItem);
    })
  ),

  // new ActionButton(
  //   {
  //     icon: "level-up",
  //     title: "Large font size",
  //     id: "large-font",
  //   },
  //   new Action(ActionTypes.style, "font-size: 1.5rem;")
  // ),

  // new ActionButton(
  //   {
  //     label: "B",
  //     title: "Bold font",
  //     id: "bold-font",
  //   },
  //   new Action(ActionTypes.style, "font-weight: bold;")
  // ),

  new ActionButton({
    icon: "line-chart",
    title: "Has chart",
    id: "charts",
  }),

  new ActionButton(
    {
      icon: "list",
      label: "H",
      title: "Has heatmap",
      square: false,
      id: "heatmap",
    },
    new Action(ActionTypes.init, (item) => {
      if (item.heatmap === undefined) {
        item.heatmap = {};
      }
    })
  ),
];

import { getHeatmap } from "./get-heatmap.logic";

import { listStore } from "../../stores/list.store";

export const resolveHeatmap = () => {
  const item = listStore.currentItem;
  // ** If not a heatmap then do nothing.
  // ** If message is an Array then we can't handle it.
  if (!item.actions.includes("heatmap") || item.message instanceof Array)
    return;

  // ** Get todays heatmap.
  const heat = getHeatmap(item);

  // ** Reset checkboxes on item message.
  item.message = item.message.replace(/--c-c/g, "--c");

  // ** If there is no recorded heatmap for today then do nothing.
  if (heat === null) return;

  // ** Define a new empty message.
  const message = [];

  const eachLine = item.message.split("\n");

  Object.keys(heat).forEach((key) => {
    eachLine.forEach((x) => {
      if (x.includes(key)) {
        message.push(x.replace("--c", "--c-c"));
      } else {
        message.push(x);
      }
    });
  });

  item.message = message.join("\n");
};

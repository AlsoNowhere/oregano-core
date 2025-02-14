import { getDate } from "sage";

import { Item } from "../../models/Item.model";

export const checkHeatmapCheckbox = (
  item: Item,
  message = item.message,
  date = new Date()
) => {
  if (item.heatmap === undefined) {
    item.heatmap = {};
  }

  const lines = message.split("\n");
  const checkedLines = lines
    .filter((x) => x.includes("--c-c"))
    .map((x) => x.replace("--c-c", ""))
    .map((x) => x.trim());

  const d = getDate(date, "dd-mm-yyyy");
  item.heatmap[d] = checkedLines;
};

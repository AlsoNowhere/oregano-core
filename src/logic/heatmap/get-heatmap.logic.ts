import { getTodaysDate } from "../../services/get-todays-date.service";

import { Item } from "../../models/Item.model";

export const getHeatmap = (
  item: Item,
  date = getTodaysDate()
): Record<string, 1> | null => {
  if (item.heatmap === undefined) {
    item.heatmap = {};
  }
  const heat = item.heatmap[date];
  return heat ?? null;
};

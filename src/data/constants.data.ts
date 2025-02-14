import { ISaveData } from "../interfaces/ISaveData.interface";

import { colours } from "./colours.data";

const data: ISaveData = {
  root: true,
  timestamp_root: Date.now(),
  title: "Oregano",
  message: "",
  colour: colours[0].colour,
  actions: [],
  items: [],
  tags: [],
  index: 0,
  createdAt: Date.now(),
  pasteItems: [],
  undo: [],
  itemIndex: 1,
};

export const defaultData = JSON.stringify(data);

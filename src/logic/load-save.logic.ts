import { appStore } from "../stores/app.store";

import { Undo } from "../models/Undo.model";
import { Item } from "../models/Item.model";

import { IData } from "../interfaces/IData.interface";
import { IRootData } from "../interfaces/IRootData.interface";
import { ISaveData } from "../interfaces/ISaveData.interface";

import { defaultData } from "../data/constants.data";

const cleanItem = (item: IData | IRootData) => {
  item.items = item.items.filter((x) => !!x);
  item.items = item.items.map(cleanItem);
  const {
    title,
    message,
    colour,
    actions,
    items,
    heatmap,
    tags,
    index,
    createdAt,
  } = item;
  const newItem = new Item({
    title,
    message,
    colour,
    actions,
    items,
    heatmap,
    tags,
    index,
    createdAt,
  });
  return newItem;
};

const cleanData = (item: IRootData) => {
  cleanItem(item);
};

const initRootData = (item: ISaveData) => {
  const undo = new Undo(item.undo);
  const output: IRootData = { ...item, undo };
  cleanData(output);
  return output;
};

export const loadData = async () => {
  if (appStore.sessionStorageKey === null) {
    console.warn(
      "Could not LOAD data, no session storage key (appStore.sessionStorageKey) provided"
    );
    return;
  }
  const localData = localStorage.getItem(appStore.sessionStorageKey);
  const data =
    !localData || localData === "undefined" ? defaultData : localData;
  const parsed = JSON.parse(data) as ISaveData;
  if (parsed.timestamp_root === undefined) {
    parsed.timestamp_root = Date.now();
  }
  appStore.rootData = initRootData(parsed);
  saveData();
};

export const saveData = async () => {
  if (appStore.sessionStorageKey === null) {
    console.warn("Could not SAVE data, no session storage key provided");
    return;
  }
  const data: any = { ...appStore.rootData };
  data.undo = data.undo.list;
  localStorage.setItem(appStore.sessionStorageKey, JSON.stringify(data));
};

import { appStore } from "../stores/app.store";

import { IData } from "../interfaces/IData.interface";
import { IRootData } from "../interfaces/IRootData.interface";

import { defaultData, sessionStorageKey } from "../data/constants.data";

const cleanItem = (item: IData | IRootData) => {
  item.items = item.items.filter((x) => !!x);
  item.items.forEach(cleanItem);
};

const cleanData = (item: IRootData) => {
  item.pasteItems = item.pasteItems.filter((x) => !!x);
  cleanItem(item);
  return item;
};

export const loadData = async () => {
  if (appStore.sessionStorageKey === null) {
    console.warn("Could not LOAD data, no session storage key provided");
    // return;
  }
  const localData = localStorage.getItem(appStore.sessionStorageKey);
  const data =
    !localData || localData === "undefined" ? defaultData : localData;
  const parsed = JSON.parse(data);
  if (parsed.timestamp_root === undefined) {
    parsed.timestamp_root = Date.now();
  }
  appStore.rootData = cleanData(parsed);
  saveData();
};

export const saveData = async () => {
  if (appStore.sessionStorageKey === null) {
    console.warn("Could not SAVE data, no session storage key provided");
    return;
  }
  const data = appStore.rootData;
  localStorage.setItem(appStore.sessionStorageKey, JSON.stringify(data));
};

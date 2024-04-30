import { IStore, MintEvent, Resolver, Store, refresh } from "mint";

import { path, wait } from "sage";

import { getItem } from "../services/get-item.service";
import { searchItems } from "../services/search-items.service";

import { appStore } from "./app.store";

const update: MintEvent<HTMLInputElement> = (_, element) => {
  searchStore.value = element.value;
};

const runSearch: MintEvent = (event) => {
  event.preventDefault();
  const { value } = searchStore;
  if (value === "") {
    searchStore.value = "";
    searchStore.results = [];
    refresh(appStore);
    return;
  }
  const { items } = getItem(path.get().slice(1));
  const { includeMessage } = searchStore;
  const results = searchItems(items, value, { includeMessage });
  searchStore.results = results;
  searchStore.searchRun = true;
  refresh(appStore);
};

const selectRoute = function () {
  path.set(["list", ...path.get().slice(1), ...this.route]);
  searchStore.value = "";
  searchStore.results = [];
  refresh(appStore);
};

export const searchStore = new Store({
  value: "",
  results: [],
  formElementRef: null,
  searchRun: false,
  includeMessage: false,

  currentTitle: new Resolver(() => {
    const item = getItem(path.get().slice(1));
    if (item === null) return "";
    return item.title;
  }),

  showNoItemFound: new Resolver(() => {
    return searchStore.searchRun && searchStore.results.length === 0;
  }),

  update,

  runSearch,

  selectRoute,

  onCheckIncludeMessage(_, element) {
    searchStore.includeMessage = element.checked;
  },

  oninsert: async function () {
    searchStore.value = "";
    searchStore.results = [];
    searchStore.searchRun = false;
    await wait();
    searchStore.formElementRef?.search?.focus();
  },
}) as IStore & {
  value: string;
  results: Array<{}>;
  formElementRef: HTMLFormElement;
  searchRun: boolean;
  includeMessage: boolean;
};

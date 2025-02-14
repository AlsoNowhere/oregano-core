import { MintEvent, Resolver, Store, node, refresh } from "mint";

import { Tab } from "thyme";

import { path, wait } from "sage";

import { getItem } from "../services/get-item.service";
import { searchItems } from "../logic/search/search-items.logic";

import { SearchByTitle } from "../components/pages/search/SearchByTitle.component";
import { SearchByTag } from "../components/pages/search/SearchByTag.component";

import { appStore } from "./app.store";
import { searchItemTags } from "../logic/search/search-item-tags.logic";

const tabs = [
  new Tab("By title", () => node(SearchByTitle)),
  new Tab("By Tag", () => node(SearchByTag)),
];

const update: MintEvent<HTMLInputElement> = (_, element) => {
  searchStore.value = element.value;
};

const runSearch: MintEvent = (event) => {
  event.preventDefault();
  const { value } = searchStore;
  if (value === "") {
    searchStore.value = "";
    searchStore.results = [];
    searchStore.tagSearchResults = [];
    refresh(searchStore);
    return;
  }
  const { items } = getItem(path.get().slice(1));
  const { includeMessage } = searchStore;

  const results = searchItems(items, value, { includeMessage });
  searchStore.results = results;

  const tagSearchResults = searchItemTags(items, value);
  searchStore.tagSearchResults = tagSearchResults;

  searchStore.searchRun = true;
  refresh(searchStore);
};

const selectRoute = function () {
  path.set(["list", ...path.get().slice(1), ...this.route]);
  searchStore.value = "";
  searchStore.results = [];
  searchStore.tagSearchResults = [];
  refresh(appStore);
};

class SearchStore extends Store {
  value: string;
  results: Array<{}>;
  tagSearchResults: Array<{}>;
  formElementRef: HTMLFormElement;
  searchRun: boolean;
  includeMessage: boolean;
  tabs: Array<Tab>;
  currentTab: Tab;

  currentTitle: Resolver<string>;
  showNoItemFound: Resolver<boolean>;
  showNoTabItemFound: Resolver<boolean>;
  fromMessageClass: Resolver<string>;

  update: MintEvent;
  runSearch: MintEvent;
  selectRoute: () => void;
  onCheckIncludeMessage: MintEvent;

  constructor() {
    super({
      value: "",
      results: [],
      tagSearchResults: [],
      formElementRef: null,
      searchRun: false,
      includeMessage: false,
      tabs,
      currentTab: tabs[0],

      currentTitle: new Resolver(() => {
        const item = getItem(path.get().slice(1));
        if (item === null) return "";
        return item.title;
      }),

      showNoItemFound: new Resolver(() => {
        return searchStore.searchRun && searchStore.results.length === 0;
      }),

      showNoTabItemFound: new Resolver(() => {
        return (
          searchStore.searchRun && searchStore.tagSearchResults.length === 0
        );
      }),

      fromMessageClass: new Resolver(function () {
        return this.isOnTitle ? "" : "border-left-blueberry";
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
        searchStore.tagSearchResults = [];
        searchStore.searchRun = false;
        await wait();
        searchStore.formElementRef?.search?.focus();
      },
    });
  }
}

export const searchStore = new SearchStore();

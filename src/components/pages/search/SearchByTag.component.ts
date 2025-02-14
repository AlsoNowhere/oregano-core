import {
  component,
  div,
  mFor,
  mIf,
  MintScope,
  node,
  Resolver,
  span,
} from "mint";

import { styles } from "sage";

import { searchStore } from "../../../stores/search.store";

class SearchByTagComponent extends MintScope {
  showNoTabItemFound: Resolver<typeof searchStore.showNoTabItemFound>;
  tagSearchResults: Resolver<typeof searchStore.tagSearchResults>;
  fromMessageClass: Resolver<typeof searchStore.fromMessageClass>;
  selectRoute: Resolver<typeof searchStore.selectRoute>;

  constructor() {
    super();

    this.showNoTabItemFound = new Resolver(
      () => searchStore.showNoTabItemFound
    );
    this.tagSearchResults = new Resolver(() => searchStore.tagSearchResults);
    this.fromMessageClass = new Resolver(() => searchStore.fromMessageClass);
    this.selectRoute = new Resolver(() => searchStore.selectRoute);
  }
}

export const SearchByTag = component(
  "div",
  SearchByTagComponent,
  { class: "padding" },
  [
    div({ mIf: mIf("showNoTabItemFound") }, "-- No items found --"),

    node(
      "ul",
      { class: "list" },
      node(
        "li",
        {
          mFor: mFor("tagSearchResults"),
          mKey: "_i",
          class: "card relative pointer hover {fromMessageClass}",
          style: styles({ "margin-bottom": "2px" }),
          "(click)": "selectRoute",
        },
        [
          span(
            {
              class: "absolute smoke-text font-size-small",
              style: styles({ top: "2px", left: "2px" }),
            },
            "{path}"
          ),
          span("{title}"),
        ]
      )
    ),
  ]
);

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

import { Field, TField } from "thyme";

import { styles } from "sage";

import { searchStore } from "../../../stores/search.store";

class SearchByTitleComponent extends MintScope {
  includeMessage: Resolver<typeof searchStore.includeMessage>;
  onCheckIncludeMessage: Resolver<typeof searchStore.onCheckIncludeMessage>;
  showNoItemFound: Resolver<typeof searchStore.showNoItemFound>;
  results: Resolver<typeof searchStore.results>;
  fromMessageClass: Resolver<typeof searchStore.fromMessageClass>;
  selectRoute: Resolver<typeof searchStore.selectRoute>;

  constructor() {
    super();

    this.includeMessage = new Resolver(() => searchStore.includeMessage);
    this.onCheckIncludeMessage = new Resolver(
      () => searchStore.onCheckIncludeMessage
    );
    this.showNoItemFound = new Resolver(() => searchStore.showNoItemFound);
    this.results = new Resolver(() => searchStore.results);
    this.fromMessageClass = new Resolver(() => searchStore.fromMessageClass);
    this.selectRoute = new Resolver(() => searchStore.selectRoute);
  }
}

export const SearchByTitle = component(
  "div",
  SearchByTitleComponent,
  { class: "padding" },
  [
    div(
      { class: "padding-bottom" },
      node<TField>(Field, {
        type: "checkbox",
        label: "Include message",
        name: "include-message",
        "[checked]": "includeMessage",
        "[onInput]": "onCheckIncludeMessage",
      })
    ),

    div({ mIf: mIf("showNoItemFound") }, "-- No items found --"),

    node(
      "ul",
      { class: "list" },
      node(
        "li",
        {
          mFor: mFor("results"),
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

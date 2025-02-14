import { MintScope, component, div, mRef, node } from "mint";

import { Field, Button, TField, Tabs, TTabs } from "thyme";

import { searchStore } from "../../stores/search.store";

class SearchComponent extends MintScope {
  constructor() {
    super();

    searchStore.connect(this);
  }
}

export const Search = component("<>", SearchComponent, null, [
  node("section", { class: "other-content__container" }, [
    node("h2", { class: "reset-margin margin-bottom-small" }, "{currentTitle}"),

    node(
      "form",
      {
        class: "flex",
        "(submit)": "runSearch",
        autocomplete: "off",
        mRef: mRef("formElementRef"),
      },
      [
        div({ class: "flex width-full" }, [
          node<TField>(Field, {
            name: "search",
            placeholder: "Search ...",
            wrapperClasses: "flex-grow margin-right-small",
            "[value]": "value",
            "[onInput]": "update",
          }),
          node(Button, {
            type: "submit",
            icon: "search",
            class: "square",
          }),
        ]),
      ]
    ),

    node<TTabs>(Tabs, {
      "[tabs]": "tabs",
    }),
  ]),
]);

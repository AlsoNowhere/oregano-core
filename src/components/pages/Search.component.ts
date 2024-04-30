import { MintComponent, component, div, element } from "mint";

import { Field, Button, TField } from "thyme";

import { AltButtons } from "../additions/AltButtons.component";

import { searchStore } from "../../stores/search.store";

class SearchComponent extends MintComponent {
  constructor() {
    super();

    searchStore.connect(this);
  }
}

export const Search = component(
  "div",
  SearchComponent,
  { class: "common-page" },
  [
    element(AltButtons),
    element(
      "div",
      {
        class: "other-content",
      },
      element("section", { class: "other-content__container" }, [
        element("h2", null, "{currentTitle}"),

        element(
          "form",
          {
            class: "flex",
            "(submit)": "runSearch",
            autocomplete: "off",
            mRef: "formElementRef",
          },
          [
            div({ class: "flex width-full" }, [
              element<TField>(Field, {
                name: "search",
                placeholder: "Search ...",
                wrapperClasses: "flex-grow margin-right-small",
                "[value]": "value",
                "[onInput]": "update",
              }),

              element(Button, {
                type: "submit",
                icon: "search",
                class: "square",
              }),
            ]),

            div(
              element<TField>(Field, {
                type: "checkbox",
                label: "Include message",
                name: "include-message",
                "[checked]": "includeMessage",
                "[onInput]": "onCheckIncludeMessage",
                // mRef: "includeMessageRef",
              })
            ),
          ]
        ),

        div({ mIf: "showNoItemFound" }, "-- No items found --"),

        element(
          "ul",
          { class: "list" },
          element(
            "li",
            {
              mFor: "results",
              mKey: "_i",
              class: "card pointer hover",
              "(click)": "selectRoute",
            },
            "{title}"
          )
        ),
      ])
    ),
  ]
);

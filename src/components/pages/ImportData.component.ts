import { MintScope, component, mRef, node } from "mint";

import { styles } from "sage";

import { Field, Button, TField } from "thyme";

import { importStore } from "../../stores/import.store";

class ImportDataComponent extends MintScope {
  constructor() {
    super();

    importStore.connect(this);
  }
}

export const ImportData = component(
  "div",
  ImportDataComponent,
  { class: "common-page" },
  [
    node(
      "div",
      { class: "other-content" },
      node("section", { class: "other-content__container" }, [
        node("h2", { class: "no-margin" }, "Import into - {currentTitle}"),

        node(
          "form",
          {
            class: "form",
            "(submit)": "onSubmit",
            mRef: mRef("importFormElement"),
          },
          [
            node<TField>(Field, {
              type: "textarea",
              name: "importValue",
              label: "Enter JSON data here",
              "[value]": "importValue",
              fieldStyles: styles({
                height: "12rem",
              }),
              "[onInput]": "onInput",
            }),
            node(Button, {
              type: "submit",
              theme: "apple",
              class: "button large padded",
              label: "Import data",
            }),
          ]
        ),
      ])
    ),
  ]
);

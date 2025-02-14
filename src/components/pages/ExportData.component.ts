import { MintScope, component, div, mRef, node } from "mint";

import { styles } from "sage";

import { Field, TField } from "thyme";

import { exportStore } from "../../stores/export.store";

export const ExportData = component(
  "<>",
  class ExportDataComponent extends MintScope {
    constructor() {
      super();

      exportStore.connect(this);
    }
  },
  null,
  [
    node("section", { class: "other-content__container" }, [
      node(
        "form",
        {
          name: "export-data",
          class: "form flex",
          mRef: mRef("formElementRef"),
        },
        [
          node(
            "h2",
            { class: "width-full reset-margin margin-bottom-small" },
            "{currentTitle}"
          ),

          div(
            node<TField>(Field, {
              type: "checkbox",
              label: "Only items",
              "[checked]": "onlyItems",
              "[onInput]": "onChangeOnlyItems",
            })
          ),

          node<TField>(Field, {
            type: "textarea",
            label: "Export data",
            name: "export-data",
            wrapperClasses: "width-full",
            "[value]": "currentValue",
            fieldStyles: styles({
              height: "300px",
              "font-size": "1rem",
              "line-height": "1.1rem",
              resize: "none",
            }),
          }),
        ]
      ),
    ]),
  ]
);

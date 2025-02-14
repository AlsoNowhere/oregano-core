import { MintScope, component, node, mRef, mIf, template } from "mint";

import { Button } from "thyme";

import { manageStore } from "../../stores/manage.store";

class ManageComponent extends MintScope {
  constructor() {
    super();

    manageStore.connect(this);
  }
}

export const Manage = component(
  "section",
  ManageComponent,
  null,
  node(
    "form",
    {
      mRef: mRef("manageFormElementRef"),
      class: "form manage-form",
      name: "manage-form",
      autocomplete: "off",
      "(submit)": "onSubmit",
    },
    [
      node("h2", null, "{mainLabel} item"),

      node("div", { class: "flex" }, [
        "_children",
        node("<>", { ...mIf("_children") }, "_children"),
        node(
          "<>",
          { ...mIf("!_children") },
          node(template({ onevery: false }, "defaultChildren"))
        ),
      ]),

      node("div", { class: "grid-12" }, [
        node(Button, {
          type: "submit",
          "[theme]": "saveButtonTheme",
          "[label]": "saveButtonLabel",
          class: "margin-right padded-small",
          large: true,
          "[saveButtonTheme]": "saveButtonTheme",
        }),
        node(Button, {
          theme: "smoke",
          label: "Cancel",
          class: "large padded-small",
          "[onClick]": "cancel",
        }),
      ]),
    ]
  )
);

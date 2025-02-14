import { MintScope, component, node } from "mint";

import { Field, TField } from "thyme";

import { treeStore } from "../../stores/tree.store";

import { Tree } from "./tree/Tree.component";

class TreeViewComponent extends MintScope {
  constructor() {
    super();

    treeStore.connect(this);
  }
}

export const TreeView = component(
  "section",
  TreeViewComponent,
  { class: "other-content__container" },
  [
    node<TField>(Field, {
      type: "checkbox",
      wrapperClasses: "margin-bottom",
      label: "Show message",
      "[checked]": "showMessage",
      id: "show-messages-field",
      "[onInput]": "toggleShowMessage",
    }),

    node("h2", { class: "other-content__title" }, "{currentTitle}"),

    node(Tree, { "[tree]": "currentList" }),
  ]
);

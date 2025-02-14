import { MintScope, component, node } from "mint";

import { Button } from "thyme";

import { path } from "sage";

import { backToList } from "../../services/back-to-list.service";

import { manageStore } from "../../stores/manage.store";

class AltButtonsComponent extends MintScope {
  type: "normal" | "edit-heat-map";
  backToList: () => void;

  constructor() {
    super();

    this.backToList = () => {
      if (manageStore.toEditMethod === "item-button") {
        path.set(path.get().slice(0, -1));
        manageStore.toEditMethod = "main-button";
      }
      backToList();
    };
  }
}

export const AltButtons = component(
  "div",
  AltButtonsComponent,
  { class: "alt-buttons" },
  node(
    "ul",
    { class: "list" },
    node(
      "li",
      null,
      node(Button, {
        theme: "blueberry",
        icon: "arrow-left",
        large: true,
        square: true,
        "[onClick]": "backToList",
      })
    )
  )
);

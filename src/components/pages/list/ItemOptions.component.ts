import { component, MintScope, node, template, TMintContent } from "mint";

import { listStore } from "../../../stores/list.store";

class ItemOptionsComponent extends MintScope {
  getItemOptions: () => TMintContent;

  constructor() {
    super();

    this.getItemOptions = function () {
      return listStore.itemOptions.map((x) => node(x, { "[index]": "index" }));
    };
  }
}

export const ItemOptions = component("<>", ItemOptionsComponent, null, [
  node(template({ conditionedBy: "index" }, "getItemOptions")),
]);

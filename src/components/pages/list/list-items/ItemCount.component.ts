import { component, mIf, MintScope, Resolver, span } from "mint";

import { listStore } from "../../../../stores/list.store";

class ItemCountComponent extends MintScope {
  itemsLength: Resolver<string>;

  constructor() {
    super();

    this.itemsLength = new Resolver(function () {
      const {
        items: { length },
      } = listStore.list[this.index];
      return !length ? "" : length + "";
    });
  }
}

export const ItemCount = component(
  "span",
  ItemCountComponent,
  { class: "list-page__item-items_length" },
  span({ mIf: mIf("itemsLength") }, "{itemsLength}")
);

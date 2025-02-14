import { component, mIf, MintScope, node, Resolver } from "mint";

import { listStore } from "../../stores/list.store";

class HasMessageComponent extends MintScope {
  hasMessage: Resolver<boolean>;

  constructor() {
    super();

    this.hasMessage = new Resolver(function () {
      const { message } = listStore.list[this.index];
      return !!message;
    });
  }
}

export const HasMessage = component(
  "div",
  HasMessageComponent,
  {
    class: "list-page__item-has_message",
  },
  [
    node("span", {
      mIf: mIf("hasMessage"),
      class: "fa fa-list",
    }),
  ]
);

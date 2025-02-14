import { component, node, mFor, mIf, MintScope, Resolver } from "mint";

import { listStore } from "../../../stores/list.store";

import { Item } from "../../../models/Item.model";

import { actionButtons } from "../../../data/action-buttons.data";

class TitleComponent extends MintScope {
  item: Item | {};
  filteredActionButtons: Resolver<Array<{ title: string; icon: string }>>;
  hasIcon: Resolver<boolean>;

  constructor() {
    super();

    this.item = new Resolver(() => listStore.item);

    this.filteredActionButtons = new Resolver(() => {
      if (!listStore.item.actions) return [];
      const actions = listStore.item.actions
        .map((x) => {
          const action = actionButtons.find((y) => y.id === x);
          if (!action) return;
          const { title, icon, id } = action;
          return { title, icon, id };
        })
        .filter((x) => !!x);
      return actions;
    });

    this.hasIcon = new Resolver(function () {
      return this.icon !== null;
    });
  }
}

export const Title = component(
  "div",
  TitleComponent,
  {
    class: "list-page__title",
  },
  [
    node("h2", null, "{item.title}"),

    node(
      "ul",
      { class: "list flex align-centre" },
      node(
        "li",
        {
          mFor: mFor("filteredActionButtons"),
          mKey: "id",
          class: "padding-left",
        },
        node("span", { "[title]": "title" }, [
          node("span", { mIf: mIf("hasIcon"), class: "fa fa-{icon}" }),
        ])
      )
    ),
  ]
);

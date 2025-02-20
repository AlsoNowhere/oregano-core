import { component, MintScope, mIf, node, Resolver, refresh } from "mint";

import { path, wait } from "sage";

import { listStore } from "../../../stores/list.store";

class ItemTitleComponent extends MintScope {
  _index: number;
  backgroundColor: string;
  textColor: string;
  showOverflow: Resolver<boolean>;
  url: Resolver<string>;

  constructor() {
    super();

    this.onaftereach = async function () {
      if (this._index === this.index) return;
      this._index = this.index;
      await wait();
      refresh(this);
    };

    this.backgroundColor = "transparent";
    this.textColor = "#000";

    this.showOverflow = new Resolver(function () {
      const item = listStore.listElementRef.children[this.index];
      if (!item) return false;
      const title = item.querySelector(".list-page__item-title") as HTMLElement;
      const p = item.querySelector(".list-page__item-title-p") as HTMLElement;
      if (!title || !p) return false;
      {
        const container = title.parentElement as HTMLElement;
        this.backgroundColor = container.style.backgroundColor;
        this.textColor = container.style.color;
      }
      if (!p || p.offsetWidth === 0) return false;
      if (p.offsetWidth < title.offsetWidth) return false;
      return true;
    });

    this.url = new Resolver(() => path.get().join("/"));
  }
}

export const ItemTitle = component(
  "a",
  ItemTitleComponent,
  {
    href: "#{url}/{index}",
    class: "list-page__item-title",
    "(click)": "selectItem",
  },
  [
    node("p", { class: "list-page__item-title-p" }, "{title}"),
    node(
      "span",
      {
        mIf: mIf("showOverflow"),
        class: "list-page__item-title-overflow",
      },
      "..."
    ),
  ]
);

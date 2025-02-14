import { MintScope, Resolver, component, node, mFor, mIf, refresh } from "mint";

import { path, toast, wait } from "sage";

import { upLevel } from "../../logic/main-buttons/up-level.logic";

import { appStore } from "../../stores/app.store";
import { listStore } from "../../stores/list.store";

import { IData } from "../../interfaces/IData.interface";

interface ICrumbs {
  content: string;
  isLink: boolean;
}

class BreadcrumbsComponent extends MintScope {
  crumbs: Resolver<Array<ICrumbs>>;

  goToLink: () => void;

  constructor() {
    super();

    this.crumbs = new Resolver(() => {
      let output: Array<ICrumbs> = [];
      if (appStore.rootData === null) return output;

      const url = path.get();

      if (url.length === 1) {
        output = [{ content: " -- root -- ", isLink: false }];
        return output;
      }

      if (url.length === 1) return [{ content: " ", isLink: false }];
      let data: IData = appStore.rootData;
      const crumbs: Array<ICrumbs> = url.reduce((a, b, i) => {
        if (i === 0) {
          a.push({ content: data.title, isLink: true });
          return a;
        }
        data = data.items[b];
        if (data === undefined) {
          toast("Unable to find this item, returning to home.", "tomato");
          (async () => {
            await wait();
            upLevel();
          })();
          return [];
        }
        a.push(
          { content: "/", isLink: false },
          { content: data.title, isLink: i !== url.length - 1 }
        );
        return a;
      }, [] as Array<ICrumbs>);
      output = crumbs;
      return output;
    });

    this.goToLink = function () {
      const url = path.get();
      const index = this._i / 2;
      path.set(url.slice(0, index + 1));
      refresh(listStore);
    };
  }
}

export const Breadcrumbs = component(
  "ul",
  BreadcrumbsComponent,
  { class: "breadcrumbs" },
  node("li", { mFor: mFor("crumbs"), mKey: "_i", class: "breadcrumbs__item" }, [
    node(
      "span",
      {
        mIf: mIf("isLink"),
        class: "breadcrumbs__item-link",
        "(click)": "goToLink",
      },
      "{content}"
    ),
    node("span", { mIf: mIf("!isLink") }, "{content}"),
  ])
);

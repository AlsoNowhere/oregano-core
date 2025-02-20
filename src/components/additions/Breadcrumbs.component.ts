import { MintScope, Resolver, component, node, mFor, mIf, refresh } from "mint";

import { path, toast, wait } from "sage";

import { upLevel } from "../../logic/main-buttons/up-level.logic";

import { appStore } from "../../stores/app.store";
import { listStore } from "../../stores/list.store";

import { IData } from "../../interfaces/IData.interface";

type TCrumbs =
  | {
      content: string;
      isLink: true;
      target: string;
    }
  | {
      content: string;
      isLink: false;
    };

class BreadcrumbsComponent extends MintScope {
  crumbs: Resolver<Array<TCrumbs>>;

  goToLink: () => void;

  constructor() {
    super();

    this.crumbs = new Resolver(() => {
      let output: Array<TCrumbs> = [];

      if (appStore.rootData === null) return output;

      const url = path.get();

      if (url.length === 1) {
        output = [{ content: " -- root -- ", isLink: false }];
        return output;
      }

      if (url.length === 1) return [{ content: " ", isLink: false }];

      let data: IData = appStore.rootData;

      const crumbs: Array<TCrumbs> = url.reduce((a, b, i) => {
        const index = i;
        const target = url.slice(0, index + 1).join("/");

        if (i === 0) {
          a.push({
            content: data.title,
            isLink: true,
            target,
          });
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

        a.push({ content: "/", isLink: false });

        if (i !== url.length - 1) {
          a.push({ content: data.title, isLink: true, target });
        } else {
          a.push({ content: data.title, isLink: false });
        }

        return a;
      }, [] as Array<TCrumbs>);
      output = crumbs;
      return output;
    });

    this.goToLink = async function () {
      await wait();
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
      "a",
      {
        mIf: mIf("isLink"),
        href: "#{target}",
        class: "breadcrumbs__item-link",
        "(click)": "goToLink",
      },
      "{content}"
    ),
    node("span", { mIf: mIf("!isLink") }, "{content}"),
  ])
);

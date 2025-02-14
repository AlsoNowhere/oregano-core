import {
  component,
  mExtend,
  mIf,
  MintEvent,
  MintScope,
  node,
  refresh,
  Resolver,
} from "mint";

import { path } from "sage";

import { Button } from "thyme";

import { appStore } from "../../stores/app.store";
import { listStore } from "../../stores/list.store";

import { mainButtonProps } from "../../data/main-button-props.data";

class GraphSecondaryButtonComponent extends MintScope {
  showButton: Resolver<boolean>;
  openGraph: MintEvent;

  constructor() {
    super();

    this.showButton = new Resolver(() => {
      return listStore.item.actions?.includes("charts");
    });

    this.openGraph = function () {
      path.set(["graph-view", ...path.get().slice(1)]);
      refresh(appStore);
    };
  }
}

export const GraphSecondaryButton = component(
  "<>",
  GraphSecondaryButtonComponent,
  null,
  node(Button, {
    mIf: mIf("showButton"),
    theme: "snow",
    icon: "line-chart",
    title: "Graph",
    mExtend: mExtend(mainButtonProps),
    "[onClick]": "openGraph",
  })
);

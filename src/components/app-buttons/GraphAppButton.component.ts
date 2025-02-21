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

import { appButtonProps } from "../../data/app-button-props.data";

class GraphAppButtonComponent extends MintScope {
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

export const GraphAppButton = component(
  "<>",
  GraphAppButtonComponent,
  null,
  node(Button, {
    mIf: mIf("showButton"),
    theme: "snow",
    icon: "line-chart",
    title: "Graph",
    mExtend: mExtend(appButtonProps),
    "[onClick]": "openGraph",
  })
);

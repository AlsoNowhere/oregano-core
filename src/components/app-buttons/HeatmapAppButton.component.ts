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

class HeatmapAppButtonComponent extends MintScope {
  showButton: Resolver<boolean>;
  openHeatmap: MintEvent;

  constructor() {
    super();

    this.showButton = new Resolver(() => {
      return listStore.item.actions?.includes("heatmap");
    });

    this.openHeatmap = function () {
      path.set(["heatmap", ...path.get().slice(1)]);
      refresh(appStore);
    };
  }
}

export const HeatmapAppButton = component(
  "<>",
  HeatmapAppButtonComponent,
  null,
  node(Button, {
    mIf: mIf("showButton"),
    theme: "blueberry",
    icon: "list",
    title: "Heatmap",
    mExtend: mExtend(appButtonProps),
    "[onClick]": "openHeatmap",
  })
);

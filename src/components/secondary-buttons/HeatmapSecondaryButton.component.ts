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

class HeatmapSecondaryButtonComponent extends MintScope {
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

export const HeatmapSecondaryButton = component(
  "<>",
  HeatmapSecondaryButtonComponent,
  null,
  node(Button, {
    mIf: mIf("showButton"),
    theme: "blueberry",
    icon: "list",
    title: "Heatmap",
    mExtend: mExtend(mainButtonProps),
    "[onClick]": "openHeatmap",
  })
);

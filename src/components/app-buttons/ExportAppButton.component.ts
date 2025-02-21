import { component, mExtend, MintEvent, MintScope, node, refresh } from "mint";

import { Button } from "thyme";

import { path } from "sage";

import { appStore } from "../../stores/app.store";

import { appButtonProps } from "../../data/app-button-props.data";

class ExportAppButtonComponent extends MintScope {
  openExport: MintEvent;

  constructor() {
    super();

    this.openExport = function () {
      path.set(["export", ...path.get().slice(1)]);
      refresh(appStore);
    };
  }
}

export const ExportAppButton = component(
  "<>",
  ExportAppButtonComponent,
  null,
  node(Button, {
    theme: "apple",
    icon: "upload",
    title: "Export",
    mExtend: mExtend(appButtonProps),
    "[onClick]": "openExport",
  })
);

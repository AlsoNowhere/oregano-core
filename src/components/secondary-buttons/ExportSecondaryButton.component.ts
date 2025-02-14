import { component, mExtend, MintEvent, MintScope, node, refresh } from "mint";

import { Button } from "thyme";

import { path } from "sage";

import { appStore } from "../../stores/app.store";

import { mainButtonProps } from "../../data/main-button-props.data";

class ExportSecondaryButtonComponent extends MintScope {
  openExport: MintEvent;

  constructor() {
    super();

    this.openExport = function () {
      path.set(["export", ...path.get().slice(1)]);
      refresh(appStore);
    };
  }
}

export const ExportSecondaryButton = component(
  "<>",
  ExportSecondaryButtonComponent,
  null,
  node(Button, {
    theme: "apple",
    icon: "upload",
    title: "Export",
    mExtend: mExtend(mainButtonProps),
    "[onClick]": "openExport",
  })
);

import { component, mExtend, MintEvent, MintScope, node, refresh } from "mint";

import { path } from "sage";

import { Button } from "thyme";

import { appStore } from "../../stores/app.store";

import { appButtonProps } from "../../data/app-button-props.data";

class ImportAppButtonComponent extends MintScope {
  openImport: MintEvent;

  constructor() {
    super();

    this.openImport = function () {
      path.set(["import", ...path.get().slice(1)]);
      refresh(appStore);
    };
  }
}

export const ImportAppButton = component(
  "<>",
  ImportAppButtonComponent,
  null,
  node(Button, {
    theme: "snow",
    icon: "download",
    title: "Import",
    mExtend: mExtend(appButtonProps),
    "[onClick]": "openImport",
  })
);

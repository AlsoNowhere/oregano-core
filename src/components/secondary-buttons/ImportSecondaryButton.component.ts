import { component, mExtend, MintEvent, MintScope, node, refresh } from "mint";

import { path } from "sage";

import { Button } from "thyme";

import { appStore } from "../../stores/app.store";

import { mainButtonProps } from "../../data/main-button-props.data";

class ImportSecondaryButtonComponent extends MintScope {
  openImport: MintEvent;

  constructor() {
    super();

    this.openImport = function () {
      path.set(["import", ...path.get().slice(1)]);
      refresh(appStore);
    };
  }
}

export const ImportSecondaryButton = component(
  "<>",
  ImportSecondaryButtonComponent,
  null,
  node(Button, {
    theme: "snow",
    icon: "download",
    title: "Import",
    mExtend: mExtend(mainButtonProps),
    "[onClick]": "openImport",
  })
);

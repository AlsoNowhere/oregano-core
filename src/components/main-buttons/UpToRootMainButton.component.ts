import { node, component, MintScope, mExtend } from "mint";

import { Button } from "thyme";

import { path } from "sage";

import { upToRoot } from "../../logic/main-buttons/up-to-root.logic";

import { mainButtonProps } from "../../data/main-button-props.data";

class UpToRootMainButtonComponent extends MintScope {
  upToRoot: () => void;
  disabled: () => void;

  constructor() {
    super();

    this.upToRoot = upToRoot;
    this.disabled = () => path.get().length === 1;
  }
}

export const UpToRootMainButton = component(
  "<>",
  UpToRootMainButtonComponent,
  {},
  node(Button, {
    theme: "orange",
    icon: "home",
    title: "Up to root",
    mExtend: mExtend(mainButtonProps),
    id: "up-to-root",
    "[onClick]": "upToRoot",
    "[disabled]": "disabled",
  })
);

import { node, component, MintScope, mExtend } from "mint";

import { Button } from "thyme";

import { path } from "sage";

import { upToRoot } from "../../logic/app-buttons/up-to-root.logic";

import { appButtonProps } from "../../data/app-button-props.data";

class UpToRootAppButtonComponent extends MintScope {
  upToRoot: () => void;
  disabled: () => void;

  constructor() {
    super();

    this.upToRoot = upToRoot;
    this.disabled = () => path.get().length === 1;
  }
}

export const UpToRootAppButton = component(
  "<>",
  UpToRootAppButtonComponent,
  {},
  node(Button, {
    theme: "orange",
    icon: "home",
    title: "Up to root",
    mExtend: mExtend(appButtonProps),
    id: "up-to-root",
    "[onClick]": "upToRoot",
    "[disabled]": "disabled",
  })
);

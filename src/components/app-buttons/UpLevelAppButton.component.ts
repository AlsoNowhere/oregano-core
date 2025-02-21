import { node, component, MintScope, mIf, Resolver, mExtend } from "mint";

import { Button } from "thyme";

import { path } from "sage";

import { upLevel } from "../../logic/app-buttons/up-level.logic";

import { appButtonProps } from "../../data/app-button-props.data";

class UpLevelAppButtonComponent extends MintScope {
  showButton: Resolver<boolean>;
  upLevel: () => void;

  constructor() {
    super();

    this.showButton = new Resolver(() => {
      return path.get().length > 1;
    });

    this.upLevel = upLevel;
  }
}

export const UpLevelAppButton = component(
  "<>",
  UpLevelAppButtonComponent,
  {},
  node(Button, {
    mIf: mIf("showButton"),
    theme: "snow",
    icon: "level-up",
    title: "Up one level",
    mExtend: mExtend(appButtonProps),
    id: "up-level-button",
    "[onClick]": "upLevel",
  })
);

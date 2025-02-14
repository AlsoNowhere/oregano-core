import { node, component, MintScope, mIf, Resolver, mExtend } from "mint";

import { Button } from "thyme";

import { path } from "sage";

import { upLevel } from "../../logic/main-buttons/up-level.logic";

import { mainButtonProps } from "../../data/main-button-props.data";

class UpLevelMainButtonComponent extends MintScope {
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

export const UpLevelMainButton = component(
  "<>",
  UpLevelMainButtonComponent,
  {},
  node(Button, {
    mIf: mIf("showButton"),
    theme: "snow",
    icon: "level-up",
    title: "Up one level",
    mExtend: mExtend(mainButtonProps),
    id: "up-level-button",
    "[onClick]": "upLevel",
  })
);

import { node, component, MintScope, Resolver, mIf, mExtend } from "mint";

import { Button } from "thyme";

import { pasteItems } from "../../logic/main-buttons/paste-items.logic";

import { appStore } from "../../stores/app.store";

import { mainButtonProps } from "../../data/main-button-props.data";

class PasteMainButtonComponent extends MintScope {
  hasPasteItems: Resolver<boolean>;
  pasteItems: () => void;
  pastItemsCount: Resolver<string>;

  constructor() {
    super();

    this.hasPasteItems = new Resolver(
      () => !!appStore.rootData?.pasteItems.length
    );

    this.pasteItems = pasteItems;

    this.pastItemsCount = new Resolver(() => {
      return appStore.rootData.pasteItems.length.toString();
    });
  }
}

export const PasteMainButton = component(
  "<>",
  PasteMainButtonComponent,
  null,
  node(Button, {
    mIf: mIf("hasPasteItems"),
    theme: "apple",
    icon: "paint-brush",
    extraButtonLabel: [node("span", null, "{pastItemsCount}")],
    title: "Paste items",
    id: "paste-item-button",
    mExtend: mExtend(mainButtonProps),
    "[onClick]": "pasteItems",
    "[pastItemsCount]": "pastItemsCount",
  })
);

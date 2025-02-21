import { node, component, MintScope, mExtend } from "mint";

import { Button } from "thyme";

import { saveToFile } from "../../services/saveToFile.service";

import { appButtonProps } from "../../data/app-button-props.data";

class SaveAppButtonComponent extends MintScope {
  save: () => void;

  constructor() {
    super();

    this.save = saveToFile;
  }
}

export const SaveAppButton = component(
  "<>",
  SaveAppButtonComponent,
  null,
  node(Button, {
    theme: "blueberry",
    icon: "floppy-o",
    title: "Save data to file",
    mExtend: mExtend(appButtonProps),
    "[onClick]": "save",
  })
);

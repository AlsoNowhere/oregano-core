import { node, component, MintScope, mExtend } from "mint";

import { Button } from "thyme";

import { saveToFile } from "../../services/saveToFile.service";
import { mainButtonProps } from "../../data/main-button-props.data";

class SaveMainButtonComponent extends MintScope {
  save: () => void;

  constructor() {
    super();

    this.save = saveToFile;
  }
}

export const SaveMainButton = component(
  "<>",
  SaveMainButtonComponent,
  null,
  node(Button, {
    theme: "blueberry",
    icon: "floppy-o",
    title: "Save data to file",
    mExtend: mExtend(mainButtonProps),
    "[onClick]": "save",
  })
);

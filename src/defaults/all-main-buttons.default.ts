import { component, node } from "mint";

import { MainButtons } from "../components/additions/MainButtons.component";
import { AddMainButton } from "../components/main-buttons/AddMainButton.component";
import { EditMainButton } from "../components/main-buttons/EditMainButton.component";
import { UpLevelMainButton } from "../components/main-buttons/UpLevelMainButton.component";
import { UpToRootMainButton } from "../components/main-buttons/UpToRootMainButton.component";
import { PasteMainButton } from "../components/main-buttons/PasteMainButton.component";
import { CutAllMainButton } from "../components/main-buttons/CutAllMainButton.component";
import { SaveMainButton } from "../components/main-buttons/SaveMainButton.component";

export const allMainButtons = [
  node(AddMainButton),
  node(EditMainButton),
  node(UpLevelMainButton),
  node(UpToRootMainButton),
  node(PasteMainButton),
  node(CutAllMainButton),
  node(SaveMainButton),
];

export const AllMainButtons = component("<>", null, null, [
  node(MainButtons, null, [...allMainButtons]),
]);

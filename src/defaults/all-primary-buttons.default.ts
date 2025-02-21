import { component, node } from "mint";

import { PrimaryButtons } from "../components/additions/PrimaryButtons.component";
import { AddAppButton } from "../components/app-buttons/AddAppButton.component";
import { EditAppButton } from "../components/app-buttons/EditAppButton.component";
import { UpLevelAppButton } from "../components/app-buttons/UpLevelAppButton.component";
import { UpToRootAppButton } from "../components/app-buttons/UpToRootAppButton.component";
import { PasteAppButton } from "../components/app-buttons/PasteAppButton.component";

export const allPrimaryButtons = [
  node(AddAppButton),
  node(EditAppButton),
  node(UpLevelAppButton),
  node(UpToRootAppButton),
  node(PasteAppButton),
];

export const AllPrimaryButtons = component("<>", null, null, [
  node(PrimaryButtons, null, [...allPrimaryButtons]),
]);

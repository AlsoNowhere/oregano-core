import { component, node } from "mint";

import { SecondaryButtons } from "../components/additions/SecondaryButtons.component";
import { ExportSecondaryButton } from "../components/secondary-buttons/ExportSecondaryButton.component";
import { ImportSecondaryButton } from "../components/secondary-buttons/ImportSecondaryButton.component";
import { TreeSecondaryButton } from "../components/secondary-buttons/TreeSecondaryButton.component";
import { SearchSecondaryButton } from "../components/secondary-buttons/SearchSecondaryButton.component";
import { GraphSecondaryButton } from "../components/secondary-buttons/GraphSecondaryButton.component";
import { HeatmapSecondaryButton } from "../components/secondary-buttons/HeatmapSecondaryButton.component";

export const allSecondaryButtons = [
  node(ExportSecondaryButton),
  node(ImportSecondaryButton),
  node(TreeSecondaryButton),
  node(SearchSecondaryButton),
  node(GraphSecondaryButton),
  node(HeatmapSecondaryButton),
];

export const AllSecondaryButtons = component("<>", null, null, [
  node(SecondaryButtons, null, [...allSecondaryButtons]),
]);

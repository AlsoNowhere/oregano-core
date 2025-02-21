import { component, node } from "mint";

import { SecondaryButtons } from "../components/additions/SecondaryButtons.component";
import { ExportAppButton } from "../components/app-buttons/ExportAppButton.component";
import { ImportAppButton } from "../components/app-buttons/ImportAppButton.component";
import { TreeAppButton } from "../components/app-buttons/TreeAppButton.component";
import { SearchAppButton } from "../components/app-buttons/SearchAppButton.component";
import { GraphAppButton } from "../components/app-buttons/GraphAppButton.component";
import { HeatmapAppButton } from "../components/app-buttons/HeatmapAppButton.component";
import { CutAllAppButton } from "../components/app-buttons/CutAllAppButton.component";
import { SaveAppButton } from "../components/app-buttons/SaveAppButton.component";

export const allSecondaryButtons = [
  node(ExportAppButton),
  node(ImportAppButton),
  node(TreeAppButton),
  node(SearchAppButton),
  node(GraphAppButton),
  node(HeatmapAppButton),
  node(CutAllAppButton),
  node(SaveAppButton),
];

export const AllSecondaryButtons = component("<>", null, null, [
  node(SecondaryButtons, null, [...allSecondaryButtons]),
]);

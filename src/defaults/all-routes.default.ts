import { node, TNode } from "mint";

import { List } from "../components/pages/List.component";
import { Manage } from "../components/pages/Manage.component";
import { ExportData } from "../components/pages/ExportData.component";
import { ImportData } from "../components/pages/ImportData.component";
import { TreeView } from "../components/pages/TreeView.component";
import { Search } from "../components/pages/Search.component";
import { GraphView } from "../components/pages/GraphView.component";
import { Heatmap } from "../components/pages/Heatmap.component";

// ** Make sure non of these are ids on any elements or the page will scroll there.
export const allRoutes: Array<[string, TNode]> = [
  ["list", node(List)],
  ["manage", node(Manage)],
  ["export", node(ExportData)],
  ["import", node(ImportData)],
  ["tree", node(TreeView)],
  ["search", node(Search)],
  ["graph-view", node(GraphView)],
  ["heatmap", node(Heatmap)],
];

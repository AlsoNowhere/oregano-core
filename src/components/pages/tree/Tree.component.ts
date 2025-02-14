import {
  MintScope,
  component,
  node,
  template,
  mIf,
  mFor,
  Resolver,
  TMintContent,
} from "mint";

import { treeStore } from "../../../stores/tree.store";

import { Item } from "../../../models/Item.model";

class TreeComponent extends MintScope {
  tree: Array<Item>;
  hasTree: Resolver<boolean>;
  showMessage: Resolver<boolean>;
  titleClasses: Resolver<string>;
  treeRepeater: () => TMintContent;

  constructor() {
    super();

    this.tree = [];

    this.hasTree = new Resolver(function () {
      return this.items?.length > 0;
    });

    this.showMessage = new Resolver(() => treeStore.showMessage);

    this.titleClasses = new Resolver(function () {
      return this.showMessage ? "bold" : "";
    });

    this.treeRepeater = () =>
      node(Tree, { mIf: mIf("hasTree"), "[tree]": "items" });
  }
}

export const Tree = component(
  "ul",
  TreeComponent,
  { class: "tree" },
  node("li", { mFor: mFor("tree"), mKey: "_i" }, [
    node("p", { "[class]": "titleClasses" }, "{title}"),
    node(
      "p",
      { mIf: mIf("showMessage"), class: "tree__message font-size-small" },
      "{message}"
    ),
    node(template({ conditionedBy: "showMessage" }, "treeRepeater")),
  ])
);

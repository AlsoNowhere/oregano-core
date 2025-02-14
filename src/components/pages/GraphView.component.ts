import { MintScope, component, div, mIf, mRef, node } from "mint";

import { styles } from "sage";

import { graphStore } from "../../stores/graph.store";

class GraphviewComponent extends MintScope {
  constructor() {
    super();

    graphStore.connect(this);
  }
}

export const GraphView = component(
  "section",
  GraphviewComponent,
  { class: "common-page" },
  [
    node("div", { class: "other-content__container" }, [
      node(
        "div",
        { class: "other-content__title margin-bottom" },
        "{currentTitle}"
      ),
      div(
        {
          mIf: mIf("!showGraph"),
        },
        "Loading..."
      ),
      node("svg", {
        mIf: mIf("showGraph"),
        class: "svgClass",
        viewBox: "0 0 836 420",
        style: styles({
          width: "836px",
          height: "420px",
        }),
        mRef: mRef("svgElementRef"),
      }),
    ]),
  ]
);

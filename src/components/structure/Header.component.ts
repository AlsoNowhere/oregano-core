import { MintScope, component, node, span } from "mint";

const lineProps = {
  y1: "4",
  y2: "28",
};

class HeaderComponent extends MintScope {
  headerTitle: string;
  version: string;

  constructor() {
    super();

    this.headerTitle = "Oregano";
    this.version = "";
  }
}

export const Header = component(
  "header",
  HeaderComponent,
  { class: "header" },
  [
    node("h1", null, [span("{headerTitle}"), span("v{version}")]),
    node("div", { class: "flex" }, [
      node(
        "button",
        {
          type: "button",
          class: "empty snow-text font-size",
        },
        node("span", {
          class: "block absolute middle width-small height",
        })
      ),
      node(
        "button",
        {
          type: "button",
          class: "empty",
        },
        node(
          "svg",
          {
            class: "absolute middle width height",
            viewBox: "0 0 32 32",
          },
          [
            node("line", {
              x1: "4",
              x2: "28",
              ...lineProps,
            }),
            node("line", {
              x1: "28",
              x2: "4",
              ...lineProps,
            }),
          ]
        )
      ),
    ]),
  ]
);

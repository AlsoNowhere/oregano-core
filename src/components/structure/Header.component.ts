import { MintComponent, component, element, span } from "mint";

import { appStore } from "../../stores/app.store";

const lineProps = {
  y1: "4",
  y2: "28",
};

class HeaderComponent extends MintComponent {
  headerTitle: string;
  version: string;

  constructor() {
    super();

    this.headerTitle = appStore.headerTitle;
    this.version = appStore.version;
  }
}

export const Header = component(
  "header",
  HeaderComponent,
  { class: "header" },
  [
    element("h1", null, [
      span("{headerTitle}"),
      span({ style: "font-size:18px;line-height:18px;" }, "v{version}"),
    ]),
    element("div", { class: "flex" }, [
      element(
        "button",
        {
          type: "button",
          class: "empty snow-text font-size",
        },
        element("span", {
          class: "block absolute middle width-small height",
        })
      ),
      element(
        "button",
        {
          type: "button",
          class: "empty",
        },
        element(
          "svg",
          {
            class: "absolute middle width height",
            viewBox: "0 0 32 32",
          },
          [
            element("line", {
              x1: "4",
              x2: "28",
              ...lineProps,
            }),
            element("line", {
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

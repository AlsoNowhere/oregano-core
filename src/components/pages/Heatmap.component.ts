import {
  MintScope,
  component,
  div,
  mFor,
  mIf,
  node,
  refresh,
  span,
} from "mint";

import { Button } from "thyme";

import { Message } from "./list/Message.component";

import { heatmapStore } from "../../stores/heatmap.store";

class HeatmapComponent extends MintScope {
  constructor() {
    super();

    heatmapStore.connect(this);
  }
}

export const Heatmap = component(
  "section",
  HeatmapComponent,
  { class: "common-page" },
  [
    node("h2", { class: "reset-margin margin-bottom" }, "Heat map"),

    div({ mIf: mIf("!isEditing") }, [
      node("p", { class: "reset-margin margin-bottom" }, "{month} - {year}"),

      node(
        "ul",
        { class: "list flex", style: "width:224px;" },
        node(
          "li",
          {
            mFor: mFor("weekDays"),
            mKey: "_i",
            class: "relative width height",
          },
          span({ class: "block absolute middle bold" }, "{_x}")
        )
      ),

      node(
        "ul",
        { class: "list flex", style: "width:224px;" },
        node(
          "li",
          {
            mFor: mFor("heatmap"),
            mKey: "_i",
            class: "relative width height",
          },
          [
            node("span", {
              mIf: mIf("hidden"),
              class:
                "block absolute middle width height smoke-bg border rounded unselect",
            }),
            node(
              "span",
              {
                mIf: mIf("!hidden"),
                class:
                  "block absolute middle width height border rounded {getShadow} text-centre line-height bold font-size-small hover pointer unselect",
                "[title]": "title",
                "[style]": "style",
                "(click)": "editHeatmap",
              },
              "{day}"
            ),
          ]
        )
      ),
    ]),

    div({ mIf: mIf("isEditing") }, [
      div(
        { class: "margin-bottom" },
        node(Button, {
          icon: "level-up",
          square: true,
          large: true,
          onClick() {
            heatmapStore.isEditing = false;
            refresh(heatmapStore);
          },
        })
      ),

      node(
        "p",
        { class: "reset-margin margin-bottom" },
        "Edit date: {editingDate}"
      ),

      node(Message, { "[message]": "message" }),
    ]),
  ]
);

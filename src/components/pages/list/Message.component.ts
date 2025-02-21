import {
  component,
  node,
  Resolver,
  MintScope,
  template,
  TMintContent,
  refresh,
  span,
} from "mint";

import { Field, TField } from "thyme";

import { path } from "sage";

import { saveData } from "../../../logic/load-save.logic";
import { checkHeatmapCheckbox } from "../../../logic/heatmap/check-heatmap-checkbox.logic";

import { listStore } from "../../../stores/list.store";
import { heatmapStore } from "../../../stores/heatmap.store";

import { actionButtons } from "../../../data/action-buttons.data";

import { ActionTypes } from "../../../enums/ActionTypes.enum";

const checkItem = (
  splits: Array<string>,
  line: string,
  index: number,
  scope: MintScope
) => {
  const newSplits = [...splits];
  newSplits.splice(
    index,
    1,
    line.includes("--c-c")
      ? line.replace("--c-c", "--c")
      : line.replace("--c", "--c-c")
  );
  if (path.get().at(0) === "list") {
    listStore.item.message = newSplits.join("\n");
    if (listStore.item.actions.includes("heatmap")) {
      checkHeatmapCheckbox(listStore.item);
    }
  } else if (path.get().at(0) === "heatmap") {
    const [d, m, y] = heatmapStore.editingDate.split("-");
    heatmapStore.message = newSplits.join("\n");
    checkHeatmapCheckbox(
      listStore.item,
      heatmapStore.message,
      new Date(`${y}/${m}/${d}`)
    );
  }
  saveData();
  refresh(scope);
};

const resolveCheckbox = (
  splits: Array<string>,
  lineContent: string,
  index: number,
  scope: MintScope
) => {
  return node<TField>(Field, {
    type: "checkbox",
    checked: lineContent.includes("--c-c"),
    label: lineContent.replace(/--c-c/g, "").replace(/--c/g, ""),
    onInput: () => checkItem(splits, lineContent, index, scope),
  });
};

const getTemplate = (message: string, scope: MintScope) => {
  const splits = message.split("\n");

  const output = splits.map((x, i) => {
    let element = "p";

    const classes = ["reset-margin"];

    // ** Order is important below

    // ** Checkbox
    if (x.includes("--c")) {
      return resolveCheckbox(splits, x, i, scope);
    }

    // ** Code
    if (x.includes("--<>")) {
      x = x.replace("--<>", "");
      element = "code";
    }

    // ** Font Bold
    if (x.includes("--b")) {
      x = x.replace(/--b/g, "");
      classes.push("bold");
    }

    // ** Font Underline
    if (x.includes("--u")) {
      x = x.replace(/--u/g, "");
      classes.push("underline");
    }

    // ** Font Italic
    if (x.includes("--i")) {
      x = x.replace(/--i/g, "");
      classes.push("italic");
    }

    // ** Add gap before and after
    if (x.includes("--gap")) {
      x = x.replace(/--gap/g, "");
      classes.push("margin-top margin-bottom");
    }

    if (x.slice(0, 2) === "--") {
      x = x.replace(/--/g, "");
      return node(element, { class: classes.join(" ") }, [
        span({ class: "fa fa-circle font-size-small" }),
        span(x),
      ]);
    }

    let content: string | TMintContent = x;

    if (content === "") {
      content = node("br");
    }

    return node(element, { class: classes.join(" ") }, content);
  });

  return output;
};

class MessageComponent extends MintScope {
  message: string;
  messageClass: string;
  currentStyles: Resolver<string>;
  messageTemplate: () => TMintContent;

  constructor() {
    super();

    this.message = "";
    this.messageClass = "";

    this.currentStyles = new Resolver(() => {
      const { item } = listStore;
      let str = "";
      const actions = item.actions || [];
      // ** For each action
      actions.forEach((x) => {
        // ** Find the action.
        const action = actionButtons.find((y) => y.id === x);
        // ** Only check actions that affect styles.
        if (action.action?.type !== ActionTypes.style) return;
        str += action.action.value;
      });
      return str;
    });

    this.messageTemplate = function () {
      return getTemplate(this.message, this);
    };
  }
}

export const Message = component(
  "div",
  MessageComponent,
  { class: "list-page__message {messageClass}" },
  [node(template({ conditionedBy: "message" }, "messageTemplate"))]
);

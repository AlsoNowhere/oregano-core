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

import { path, styles } from "sage";

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
    const _styles = {};

    // ** Order is important below

    // ** Checkbox
    if (x.includes("--c")) {
      return resolveCheckbox(splits, x, i, scope);
    }

    // ** Code
    if (x.substring(0, 4) === "--<>") {
      x = x.replace("--<>", "");
      element = "code";
    }

    // ** Font size
    if (/--fs[0-9]{2}/g.test(x.substring(0, 6))) {
      const size = x.substring(4, 6);
      x = x.replace(/--fs[0-9]{2}/, "");
      _styles["font-size"] = size + "px";
    }

    // ** Font Bold
    if (x.substring(0, 3) === "--b") {
      x = x.replace("--b", "");
      classes.push("bold");
    }

    // ** Font Underline
    if (x.substring(0, 3) === "--u") {
      x = x.replace("--u", "");
      classes.push("underline");
    }

    // ** Font Italic
    if (x.substring(0, 3) === "--i") {
      x = x.replace("--i", "");
      classes.push("italic");
    }

    // ** Add gap before and after
    if (x.substring(0, 5) === "--gap") {
      x = x.replace("--gap", "");
      classes.push("margin-top margin-bottom");
    }

    if (x.substring(0, 2) === "--") {
      x = x.replace("--", "");
      return node(element, { class: classes.join(" ") }, [
        span({ class: "fa fa-circle list-page__message-bullet" }),
        span(x),
      ]);
    }

    let content: string | TMintContent = x;

    // ** Here we day that any empty line should be a BR instead of an empty P Element.
    // ** This is because an empty P does not have any height.
    // ** We also check if there are more than one lines.
    // ** This is to stop the situation where there is no message to show but we add a BR, which is not what we want.
    if (content === "" && splits.length > 1) return node("br");

    return node(
      element,
      { class: classes.join(" "), style: styles(_styles) },
      content
    );
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

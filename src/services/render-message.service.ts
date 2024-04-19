import { MintElement, element, span } from "mint";
import { styles } from "sage";

import { Field, TField } from "thyme";

const p = (a, c?) => element("p", !!c ? a : null, c || a);

export const getCheckbox = (label, checked: boolean) => {
  return element<TField>(Field, {
    type: "checkbox",
    label,
    checked,
    value: label,
    "[onInput]": "changeCheckbox",
  });
};

export const renderMessage = (message: string) => {
  const eachLine = message.split("\n");
  const resolved: Array<MintElement> = [];

  eachLine.forEach((x) => {
    if (x === "") {
      resolved.push(p(" "));
      return;
    }
    {
      const [a, b] = [x.charAt(0), x.substring(x.length - 1)];
      if (a === '"' && b === '"') {
        resolved.push(p(x.substring(1, x.length - 1)));
        return;
      }
    }
    if (x.includes("--c")) {
      const start =
        x.indexOf("--c-c") !== -1
          ? x.indexOf("--c-c") + 6
          : x.indexOf("--c") + 4;
      const label = x.substring(start);
      resolved.push(getCheckbox(label, x.includes("--c-c")));
      return;
    }
    if (x.includes("--b")) {
      resolved.push(p({ class: "bold" }, x.replace(/(--b\s?)/g, "")));
      return;
    }
    if (x.includes("--")) {
      resolved.push(
        p({ class: "bold line-height" }, [
          span({
            class: "fa fa-circle",
            style: styles({
              "vertical-align": "middle",
              "font-size": "0.4em",
            }),
          }),
          span(x.replace(/--/g, "")),
        ])
      );
      return;
    }
    resolved.push(p({ style: "line-height: 1.2" }, x));
  });

  return resolved;
};

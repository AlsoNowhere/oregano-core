import { TMintContent } from "mint";

export class MainButton {
  name: string;
  title: string;
  icon: string;
  disabled: (() => boolean) | false;
  condition: (() => boolean) | true;
  extraButtonLabel?: () => TMintContent;
  onClick: () => void;

  constructor(
    name: string,
    title: string,
    icon: string,
    onClick: () => void,
    options: {
      disabled?: () => boolean;
      condition?: () => boolean;
      extraButtonLabel?: () => TMintContent;
    } = {}
  ) {
    this.name = name;
    this.title = title;
    this.icon = icon;
    this.onClick = onClick;

    this.disabled =
      options.disabled instanceof Function ? options.disabled : false;
    this.condition =
      options.condition instanceof Function ? options.condition : true;
    this.extraButtonLabel = options.extraButtonLabel;
  }
}

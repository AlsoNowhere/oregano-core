import { Item } from "../models/Item.model";

interface IOutput {
  title: string;
  route: Array<number>;
}

const resolveIsOnMessage = (
  message: string | Array<string>,
  includeMessage: boolean,
  value: string
) => {
  if (!includeMessage) return false;
  if (message instanceof Array) return false;
  return message.toLowerCase().includes(value.toLowerCase());
};

export const searchItems = (
  list: Array<Item>,
  value: string,
  { includeMessage }: { includeMessage: boolean },
  output: Array<IOutput> = [],
  route: Array<number> = []
) => {
  list.forEach(({ title, message, items }, index) => {
    const isOnTitle = title.toLowerCase().includes(value.toLowerCase());
    const isOnMessage = resolveIsOnMessage(message, includeMessage, value);
    if (isOnTitle || isOnMessage) {
      output.push({ title, route: [...route, index] });
    }
    if (items instanceof Array) {
      searchItems(items, value, { includeMessage }, output, [...route, index]);
    }
  });
  return output;
};

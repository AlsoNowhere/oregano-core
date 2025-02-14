import { appStore } from "../../stores/app.store";

import { Item } from "../../models/Item.model";

import { IData } from "../../interfaces/IData.interface";

interface IOutput {
  title: string;
  route: Array<number>;
  path: string;
  isOnTitle: boolean;
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

const getPath = (route: Array<number>) => {
  const [, path] = route.reduce(
    ([data, path], b) => {
      path.push(data.title);
      data = data.items[b];
      return [data, path];
    },
    [appStore.rootData, []] as [IData, Array<string>]
  );
  return path.join(" / ");
};

export const searchItems = (
  list: Array<Item>,
  value: string,
  { includeMessage }: { includeMessage: boolean },
  output: Array<IOutput> = [],
  currentRoute: Array<number> = []
) => {
  list.forEach(({ title, message, items }, index) => {
    const isOnTitle = title.toLowerCase().includes(value.toLowerCase());
    const isOnMessage = resolveIsOnMessage(message, includeMessage, value);
    if (isOnTitle || isOnMessage) {
      const route = [...currentRoute, index];
      const path = getPath(route);
      output.push({ title, route, path, isOnTitle });
    }
    if (items instanceof Array) {
      searchItems(items, value, { includeMessage }, output, [
        ...currentRoute,
        index,
      ]);
    }
  });
  return output;
};

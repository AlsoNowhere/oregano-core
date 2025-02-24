import { listStore } from "../../stores/list.store";

import { Item } from "../../models/Item.model";

interface IOutput {
  title: string;
  route: Array<number>;
  path: string;
}

const getPath = (route: Array<number>) => {
  // ** We start at the current Item we're in.
  let currentItem: Item = listStore.item;

  // ** We will output a collection of titles that represent the route.
  const outputPath = [currentItem.title];

  for (let locationIndex of route) {
    const newItem = currentItem.items[locationIndex];
    outputPath.push(newItem.title);
    currentItem = newItem;
  }

  return outputPath.join(" / ");
};

// ** Recursive function that looks through each item and its items to match against the
// ** title or the title AND message.
export const searchItemTags = (
  list: Array<Item>,
  value: string,
  output: Array<IOutput> = [],
  currentRoute: Array<number> = []
) => {
  for (let [index, { title, items, tags = [] }] of list.entries()) {
    if (!!tags.find(({ tag }) => tag.includes(value))) {
      // ** Current route defines the path to get to this item e.g. [0,2,1].
      // ** Here we extend the currentRoute to get to this item.
      const route = [...currentRoute, index];

      // ** The path is the word representation of the route.
      const path = getPath(route);
      output.push({ title, route, path });
    }
    if (items instanceof Array) {
      searchItemTags(items, value, output, [...currentRoute, index]);
    }
  }
  return output;
};

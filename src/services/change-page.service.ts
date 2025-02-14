import { path } from "sage";

export const changePage = (page: string) => {
  path.set([page, ...path.get().slice(1)]);
};

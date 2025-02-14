import { getDate } from "sage";

export const getTodaysDate = () => {
  return getDate(new Date(), "dd-mm-yyyy");
};

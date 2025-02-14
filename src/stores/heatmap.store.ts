import { Resolver, Store, refresh } from "mint";

import { path, styles, wait } from "sage";

import { getResolvedDate } from "../services/get-resolved-date.service";
import { resolveLeadingZeroes } from "../services/resolve-leading-zeroes.service";
import { getTodaysDate } from "../services/get-todays-date.service";

import { appStore } from "./app.store";
import { listStore } from "./list.store";

import { months } from "../data/months.data";

interface IDay {
  hidden: boolean;
  title?: string;
  day?: number;
  style?: string;
}

class HeatmapStore extends Store {
  message: string;

  isEditing: boolean;
  editingDate: "" | null;

  year: string;
  month: string;
  monthStartDay: number;
  weekDays: ["M", "T", "W", "T", "F", "S", "S"];

  constructor() {
    super({
      message: "",

      isEditing: false,
      editingDate: null,

      year: "",
      month: "",
      monthStartDay: 0,
      weekDays: ["M", "T", "W", "T", "F", "S", "S"],

      heatmap: new Resolver<Array<IDay>>(() => {
        const { item } = listStore;

        if (item === null) return [];

        const { month, year } = getResolvedDate();

        const isToday = (day: number) => {
          const { day: d, month: m, year: y } = getResolvedDate();
          return d === day && m === month && y === year;
        };

        const message = item.message;
        const checkboxMax = message.match(/--c/g)?.length;

        const days: Array<IDay> = Array(new Date(year, month, 0).getDate())
          .fill(null)
          .map((_, i) => {
            const d = resolveLeadingZeroes(i + 1);
            const m = resolveLeadingZeroes(month);
            const title = `${d}-${m}-${year}`;

            const output: IDay = {
              hidden: false,
              title,
              day: i + 1,
            };

            const _styles: Record<string, string> = {};
            if (item.heatmap?.[title] !== undefined) {
              const checkedTotal = item.heatmap[title].length;
              const shadow =
                Math.floor((checkedTotal / checkboxMax) * 100) / 100;
              _styles["background-color"] = `rgba(25, 207, 73, ${shadow})`;
            }
            if (isToday(i + 1)) {
              _styles.border = "2px solid orange";
            }
            output.style = styles(_styles);

            return output;
          });

        let initialDay = new Date(year, month - 1, 1).getDay() - 1;
        if (initialDay === -1) {
          initialDay = 6;
        }

        {
          let i = initialDay;
          while (i > 0) {
            days.unshift({ hidden: true });
            i--;
          }
        }

        return days;
      }),

      getShadow: new Resolver(function () {
        return this.title === getTodaysDate()
          ? "z-index shadow-block-orange"
          : "";
      }),

      oninsert: async function () {
        heatmapStore.isEditing = false;
        heatmapStore.message = listStore.item.message;
        await wait();
        const { item } = listStore;
        if (!item.actions.includes("heatmap")) {
          path.set(["list", ...path.get().slice(1)]);
          refresh(appStore);
          return;
        }
        const date = new Date();
        const [month, year] = [date.getMonth(), date.getFullYear()];
        heatmapStore.year = year.toString();
        heatmapStore.month = months[month];
        heatmapStore.monthStartDay = new Date(year, month + 1, 1).getDay() - 1;
        refresh(this);
      },

      editHeatmap(_, element) {
        if (listStore.item.heatmap === undefined) return;

        heatmapStore.isEditing = true;
        heatmapStore.editingDate = element.title;

        heatmapStore.message = listStore.item.message.replace(/--c-c/g, "--c");

        const heatmap = listStore.item.heatmap[heatmapStore.editingDate];
        if (heatmap !== undefined) {
          heatmapStore.message = heatmapStore.message
            .split("\n")
            .map((x) => {
              const value = x.replace("--c", "").trim();

              if (heatmap.includes(value)) {
                return x.replace("--c", "--c-c");
              }
              return x;
            })
            .join("\n");
        }

        refresh(heatmapStore);
      },
    });
  }
}

export const heatmapStore = new HeatmapStore();

import { Store } from "mint";
declare class HeatmapStore extends Store {
    message: string;
    isEditing: boolean;
    editingDate: "" | null;
    year: string;
    month: string;
    monthStartDay: number;
    weekDays: ["M", "T", "W", "T", "F", "S", "S"];
    constructor();
}
export declare const heatmapStore: HeatmapStore;
export {};

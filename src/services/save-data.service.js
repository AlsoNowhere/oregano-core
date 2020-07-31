
import { dataStore } from "../stores/data.store";

export const saveData = data => localStorage.setItem(dataStore.key,JSON.stringify(data));

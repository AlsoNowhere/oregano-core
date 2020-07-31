
export const saveService = key => data => localStorage.setItem(key, JSON.stringify(data));

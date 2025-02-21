import { wait } from "sage";

import { appButtonsStore } from "../stores/app-buttons.store";

export const setFocusOnFirstMainButton = async () => {
  await wait();
  const { appButtonsElement } = appButtonsStore;
  if (!appButtonsElement) return;

  const addButton = [...appButtonsElement.children].find((x) =>
    x.classList.contains("main-button--add")
  );
  if (!addButton) return;

  (addButton as HTMLElement)?.focus?.();
};

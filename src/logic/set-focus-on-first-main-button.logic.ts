import { wait } from "sage";

import { mainButtonsStore } from "../stores/main-buttons.store";

export const setFocusOnFirstMainButton = async () => {
  await wait();
  const { mainButtonsElement } = mainButtonsStore;
  if (!mainButtonsElement) return;

  const addButton = [...mainButtonsElement.children].find((x) =>
    x.classList.contains("main-button--add")
  );
  if (!addButton) return;

  (addButton as HTMLElement)?.focus?.();
};

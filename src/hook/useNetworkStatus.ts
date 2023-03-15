import { createEffect, createSignal, onCleanup } from "solid-js";

export const useNetworkStatus = () => {
  const [state, setState] = createSignal<boolean>(false);

  createEffect(() => {
    const callback = () => {
      setState(navigator.onLine);
    };

    window.addEventListener("online", callback, false);
    window.addEventListener("offline", callback, false);

    callback();

    onCleanup(() => {
      window.removeEventListener("online", callback, false);
      window.removeEventListener("offline", callback, false);
    });
  });

  return state;
};

import { Component, Show } from "solid-js";
import { Alert } from "./Alert";

export type Props = {
  isOnline: boolean;
};
export const OnlineStatus: Component<Props> = (props) => {
  return (
    <div class="flex w-full">
      <Show when={props.isOnline}>
        <Alert
          class="w-full"
          type="warning"
          headline="Security alert"
          description="Turn off your Internet connection before entering your phrase or uploading your keystore."
        />
      </Show>

      <Show when={!props.isOnline}>
        <Alert
          class="w-full"
          type="success"
          headline="Good Security"
          description="Your Internet connection has been turned off."
        />
      </Show>
    </div>
  );
};

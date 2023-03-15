import { Component, Match, Switch, JSX, splitProps } from "solid-js";
import * as T from "../types";

export type Props = {
  address: T.Address;
} & JSX.HTMLAttributes<HTMLElement>;

export const Address: Component<Props> = (props) => {
  const { chain } = props.address;
  const r = props.address.resource;

  return (
    <div class={`w-full flex flex-col ${props.class || ""}`}>
      <h2 class="text-xl">{chain}</h2>
      <Switch>
        <Match when={r.loading}>
          <p>Deriving address...</p>
        </Match>
        <Match when={r.error}>
          <p>Address error ${r.error()}</p>
        </Match>
        <Match when={r()}>
          <p>{r()}</p>
        </Match>
      </Switch>
    </div>
  );
};

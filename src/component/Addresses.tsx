import { Component, JSX, For } from "solid-js";
import * as T from "../types";
import { Address } from "./Address";

export type Props = {
  addresses: T.Addresses;
} & JSX.HTMLAttributes<HTMLElement>;

export const Addresses: Component<Props> = (props) => {
  return (
    <div class={`w-full p-12 ${props.class || ""}`}>
      <For each={props.addresses}>
        {(address) => <Address address={address} />}
      </For>
    </div>
  );
};

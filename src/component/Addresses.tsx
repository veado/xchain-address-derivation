import { Component, JSX, For, mapArray } from "solid-js";
import * as T from "../types";
import { Address } from "./Address";

export type Props = {
  addresses: T.Addresses;
  paths: T.DerivationPaths;
} & JSX.HTMLAttributes<HTMLElement>;

export const Addresses: Component<Props> = (props) => {
  // Compute a list of addresses and its paths
  // to keep its reactivity within `For`
  const mapAddressList = (
    paths: T.DerivationPaths
  ): Array<{ address: T.Address; path: T.DerivationPath }> =>
    props.addresses.map((address) => ({ address, path: paths[address.chain] }));

  return (
    <div class={`w-full px-12 pb-12 ${props.class || ""}`}>
      <h1 class="2xl pt-4 pb-8">Addresses</h1>
      <For each={mapAddressList(props.paths)}>
        {({ address, path }) => <Address address={address} path={path} />}
      </For>
    </div>
  );
};

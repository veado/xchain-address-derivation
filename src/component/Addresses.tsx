import { Component, JSX, For, createSignal, Show } from "solid-js";
import * as T from "../types";
import { chainToString } from "../util/common";
import { Address } from "./Address";
import { LoaderIcon } from "./icon/LoaderIcon";
import { SearchInput } from "./SearchInput";

export type Props = {
  addresses: T.Addresses;
  paths: T.DerivationPaths;
  loading: boolean;
} & JSX.HTMLAttributes<HTMLElement>;

export const Addresses: Component<Props> = (props) => {
  // Compute a list of addresses and its paths
  // to keep its reactivity within `For`
  const mapAddressList = (): Array<{
    address: T.Address;
    path: T.DerivationPath;
  }> =>
    props.addresses.map((address) => ({
      address,
      path: props.paths[address.chain],
    }));

  const [addresses, setAddresses] = createSignal(mapAddressList());

  const onSearchHandler = (search: string) => {
    const s = search.toLocaleLowerCase();

    const updated = !!search
      ? addresses().filter(
          (address) =>
            // filter by chain name
            chainToString(address.address.chain)
              .toLocaleLowerCase()
              .includes(s) ||
            //  or by address
            (address.address.resource() &&
              address.address.resource().toLowerCase().includes(s))
        )
      : mapAddressList();
    setAddresses(updated);
  };

  return (
    <div class={`w-full px-12 pb-12 bg-white ${props.class || ""}`}>
      <h1 class="2xl py-8 mb-0 flex items-center">
        Addresses
        <Show when={props.loading}>
          <LoaderIcon class="ml-3 text-gray-500" />
        </Show>
      </h1>
      <SearchInput
        class="mb-8 w-full"
        placeholder="Search addresses"
        onChangeSearch={onSearchHandler}
      />
      <For each={addresses()}>
        {({ address, path }) => <Address address={address} path={path} />}
      </For>
    </div>
  );
};

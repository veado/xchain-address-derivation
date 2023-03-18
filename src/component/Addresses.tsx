import {
  Component,
  JSX,
  For,
  createSignal,
  Show,
  createEffect,
} from "solid-js";
import * as T from "../types";
import { chainToString } from "../util/common";
import { Address } from "./Address";
import { LoaderIcon } from "./icon/LoaderIcon";
import { SortAlphaDownIcon } from "./icon/SortAlphaDownIcon";
import { SortAlphaUpIcon } from "./icon/SortAlphaUpIcon";
import { SearchInput } from "./SearchInput";

type Sort = "up" | "down";

export type Props = {
  addresses: T.Addresses;
  paths: T.DerivationPaths;
  loading: boolean;
} & JSX.HTMLAttributes<HTMLElement>;

export const Addresses: Component<Props> = (props) => {
  // Compute a list of addresses and its paths
  const mapAddressList = (): Array<{
    address: T.Address;
    path: T.DerivationPath;
  }> =>
    props.addresses.map((address) => ({
      address,
      path: props.paths[address.chain],
    }));

  const [addresses, setAddresses] = createSignal(mapAddressList());
  const [sort, setSort] = createSignal<Sort>("down");
  const [searchTxt, setSearchTxt] = createSignal<string>("");

  const updateAddresses = (search: string, sort: Sort) => {
    const s = search.toLocaleLowerCase();
    // filter addresses by `search`
    const filtered = !!search
      ? mapAddressList().filter(
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

    // sort addresses
    const sorted = filtered.sort((a, b) => {
      const chainA = a.address.chain.toLowerCase();
      const chainB = b.address.chain.toLowerCase();
      return sort === "down"
        ? chainA.localeCompare(chainB)
        : chainB.localeCompare(chainA);
    });

    setAddresses(sorted);
  };

  const onSearchHandler = (search: string) => {
    setSearchTxt(search);
  };

  const toggleSort = () => {
    setSort((current) => (current === "down" ? "up" : "down"));
  };

  /**
   * Effect to update addresses depending on `searchTxt` and `sort`
   */
  createEffect<{
    searchTxt: string;
    sort: Sort;
  }>(
    (prev) => {
      // Simple check of changes of `props.paths` - needed to update `addresses` after changing paths
      const pathsChanged = () => !!props.paths;
      // dirty check to avoid `too much recursion`
      if (
        prev.searchTxt != searchTxt() ||
        prev.sort !== sort() ||
        pathsChanged
      ) {
        updateAddresses(searchTxt(), sort());
      }

      return {
        searchTxt: searchTxt(),
        sort: sort(),
      };
    },
    { searchTxt: searchTxt(), sort: sort() }
  );

  return (
    <div class={`w-full px-12 pb-12 bg-white ${props.class || ""}`}>
      <h1 class="2xl py-8 mb-0 flex items-center">
        Addresses
        <div
          class="mx-2 text-gray-400 hover:text-gray-700 cursor-pointer ease"
          onclick={() => toggleSort()}
        >
          <Show when={sort() === "down"}>
            <SortAlphaDownIcon />
          </Show>
          <Show when={sort() === "up"}>
            <SortAlphaUpIcon />
          </Show>
        </div>
        <Show when={props.loading}>
          <LoaderIcon class="" />
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

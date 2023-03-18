import { Component, createSignal, JSX, Show } from "solid-js";
import { CHAINS } from "../const";
import { chainToString } from "../util/common";
import { BarUpIcon } from "./icon/BarUpIcon";

export type Props = {} & JSX.HTMLAttributes<HTMLElement>;

export const Hero: Component<Props> = (props) => {
  const [showMore, setShowMore] = createSignal(false);

  const toggle = () => setShowMore((s) => !s);

  return (
    <div class={`${props.class || ""}`}>
      <h1 class="text-5xl text-center mb-1">XChain Address Derivation<sup class="text-xs top-[-3em] bg-yellow-300 rounded-full px-3 py-0.5 shadow-md">beta</sup></h1>
      <p class="text-center text-gray-400 mb-1">
        Utility to derive addresses from a mnemonic phrase (
        <a
          class="link text-gray-400"
          href="https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki"
        >
          BIP39
        </a>
        ) or keystore.{" "}
        <Show when={showMore()}>
          <div class="mt-2">
            Similar to{" "}
            <a href="https://iancoleman.io/bip39/">
              Iancoleman's Mnemonic Code Converter
            </a>
            , but built on{" "}
            <a class="" href="https://github.com/xchainjs/xchainjs-lib">
              xchain-*
            </a>{" "}
            and for chains supported by{" "}
            <a href="https://thorchain.org"> THORChain</a> and{" "}
            <a href="https://www.mayaprotocol.com/">Maya</a> only. Currently{" "}
            {[...CHAINS]
              .sort((a, b) => {
                const chainA = a.toLowerCase();
                const chainB = b.toLowerCase();
                return chainA.localeCompare(chainB);
              })
              .map(
                (chain, index) =>
                  `${chainToString(chain)} ${
                    index < CHAINS.length - 1 ? ", " : ""
                  }`
              )}
            .
          </div>
        </Show>
      </p>
      <div
        class="cursor-pointer flex justify-center"
        onclick={toggle}
        classList={{ "rotate-180": !showMore() }}
      >
        <BarUpIcon class="text-gray-400 hover:text-inherit w-5 h-5" />
      </div>
    </div>
  );
};

import { Component, createSignal, JSX, Show } from "solid-js";
import { CHAINS } from "../const";
import { chainToString } from "../util/common";
import { BarUpIcon } from "./icon/BarUpIcon";

export type Props = {} & JSX.HTMLAttributes<HTMLElement>;

export const Hero: Component<Props> = (props) => {
  const [showMore, setShowMore] = createSignal(false);

  const toggle = () => setShowMore((s) => !s);

  return (
    <div class={`flex flex-col items-center ${props.class || ""}`}>
      <h1 class="text-4xl md:text-5xl text-center mb-1">
        XChain Address Derivation
        <sup class="text-xs top-[-1.5em] md:top-[-2.5em] bg-yellow-300 rounded-full px-3 py-0.5 shadow-md">
          alpha
        </sup>
      </h1>
      <div class="w-[80%] text-center">
        <p class="text-gray-400 mb-1">
          Utility to derive addresses from a mnemonic phrase (
          <a
            class="link text-gray-400"
            href="https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki"
          >
            BIP39
          </a>
          ) or keystore (<a
            class="link text-gray-400"
            href="https://github.com/xchainjs/xchainjs-lib"
          >
            XChain
          </a>).{" "}
        </p>
        <Show when={showMore()}>
          <div class="my-2 text-gray-400">
            <p>
              Very similar to Iancoleman's{" "}
              <a class="link text-gray-400" href="https://iancoleman.io/bip39/">
                Mnemonic Code Converter
              </a>
              , but more simplified and for chains supported by{" "}
              <a class="link text-gray-400" href="https://thorchain.org">
                {" "}
                THORChain
              </a>{" "}
              and{" "}
              <a
                class="link text-gray-400"
                href="https://www.mayaprotocol.com/"
              >
                Maya
              </a>{" "}
              only.
            </p>

            <p>
              Currently supported:{" "}
              {[...CHAINS]
                .sort((a, b) => {
                  const chainA = a.toLowerCase();
                  const chainB = b.toLowerCase();
                  return chainA.localeCompare(chainB);
                })
                .map(
                  (chain, index) =>
                    `${chainToString(chain)}${
                      index < CHAINS.length - 1 ? ", " : ""
                    }`
                )}
              .
            </p>

            <p>
              Derivation of addresses built with{" "}
              <a
                class="link text-gray-400"
                href="https://github.com/xchainjs/xchainjs-lib"
              >
                XChainjs
              </a>
              .
            </p>
          </div>
        </Show>
        <div
          class="cursor-pointer flex justify-center"
          onclick={toggle}
          classList={{ "rotate-180": !showMore() }}
        >
          <BarUpIcon class="text-gray-400 hover:text-inherit w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

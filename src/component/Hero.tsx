import { Component, JSX } from "solid-js";

export type Props = {} & JSX.HTMLAttributes<HTMLElement>;

export const Hero: Component<Props> = (props) => {
  return (
    <div class={`${props.class || ""}`}>
      <h1 class="text-5xl text-center mb-1">XChain Address Derivation</h1>
      <p class="text-center text-gray-400">
        Utility to derive addresses from a mnemonic phrase (
        <a
          class="link text-gray-400"
          href="https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki"
        >
          BIP39
        </a>
        ) or keystore. Similar to{" "}
        <a href="https://iancoleman.io/bip39/">
          Iancoleman's Mnemonic Code Converter
        </a>
        , but using{" "}
        <a class="" href="https://github.com/xchainjs/xchainjs-lib">
          xchain-*
        </a>{" "}
        packages and for chain assets supported by{" "}
        <a href="https://thorchain.org"> THORChain</a> and{" "}
        <a href="https://www.mayaprotocol.com/">Maya</a> only. Currently ATOM,
        AVAX, BCH, BNB, BTC, DOGE, ETH, LTC, MAYA and RUNE.
      </p>
    </div>
  );
};

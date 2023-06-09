import {
  Addresses,
  Chain,
  DerivationPaths,
  Form,
  FormSource,
  GetAddressByChain,
  GetAddressParams,
  Network,
} from "./types";

import { createStore } from "solid-js/store";
import {
  createEffect,
  createResource,
  createSignal,
  Resource,
  Setter,
} from "solid-js";
import { getAddress } from "./service";
import { setDerivationPathIndex } from "./util/common";
import {
  AVAXChain,
  BSCChain,
  CHAINS,
  ETHChain,
  INITIAL_SOURCE_TYPE,
} from "./const";
import { THORChain } from "@xchainjs/xchain-thorchain";
import { MAYAChain } from "@xchainjs/xchain-mayachain";
import { BNBChain } from "@xchainjs/xchain-binance";
import { GAIAChain } from "@xchainjs/xchain-cosmos";
import { BTCChain } from "@xchainjs/xchain-bitcoin";
import { BCHChain } from "@xchainjs/xchain-bitcoincash";
import { LTCChain } from "@xchainjs/xchain-litecoin";
import { DOGEChain } from "@xchainjs/xchain-doge";

/**
 * Derivation paths
 * `m / purpose' / cointype' / account' / change / index`
 * are stored as
 * [purpose, cointype, account, change, index]
 * */

export const INITIAL_DERIVATION_PATHS: DerivationPaths = {
  // THORChain
  // m/44'/931'/0'/0/0
  // https://github.com/xchainjs/xchainjs-lib/blob/0b284b5289a6d439f21ad30098b61dbfcdaeeee1/packages/xchain-thorchain/src/client.ts#L123-L124
  THOR: [44, 931, 0, 0, 0],
  // Maya
  // m/44'/931'/0'/0/0
  // https://github.com/xchainjs/xchainjs-lib/blob/0b284b5289a6d439f21ad30098b61dbfcdaeeee1/packages/xchain-mayachain/src/client.ts#L113-L114
  MAYA: [44, 931, 0, 0, 0],
  // Binance
  // m/44'/931'/0'/0/0
  // https://github.com/xchainjs/xchainjs-lib/blob/0b284b5289a6d439f21ad30098b61dbfcdaeeee1/packages/xchain-binance/src/client.ts#L96-L97
  BNB: [44, 931, 0, 0, 0],
  // Cosmos
  // m/44'/118'/0'/0/0
  // https://github.com/xchainjs/xchainjs-lib/blob/master/packages/xchain-cosmos/src/utils.ts#L241
  GAIA: [44, 118, 0, 0, 0],
  // ETH
  // m/44'/60'/0'/0/0
  // https://github.com/xchainjs/xchainjs-lib/blob/master/packages/xchain-ethereum/src/client.ts#L125
  ETH: [44, 60, 0, 0, 0],
  // BSC
  // m/44'/60'/0'/0/0
  // https://github.com/xchainjs/xchainjs-lib/blob/master/packages/xchain-bsc/src/const.ts#L82
  BSC: [44, 60, 0, 0, 0],
  // AVAX
  // m/44'/60'/0'/0/0
  // https://github.com/xchainjs/xchainjs-lib/blob/master/packages/xchain-avax/src/const.ts#L81
  AVAX: [44, 60, 0, 0, 0],
  // BTC
  // m/84'/0'/0'/0/0
  // https://github.com/xchainjs/xchainjs-lib/blob/master/packages/xchain-bitcoin/src/client.ts#L59
  BTC: [84, 0, 0, 0, 0],
  // BCH
  // m/44'/145'/0'/0/0
  // https://github.com/xchainjs/xchainjs-lib/blob/master/packages/xchain-bitcoincash/src/client.ts#L55
  BCH: [44, 145, 0, 0, 0],
  // LTC
  // m/84'/2'/0'/0/0
  // https://github.com/xchainjs/xchainjs-lib/blob/master/packages/xchain-litecoin/src/client.ts#L67
  LTC: [84, 2, 0, 0, 0],
  // DOGE
  // m/44'/3'/0'/0/0
  // https://github.com/xchainjs/xchainjs-lib/blob/master/packages/xchain-doge/src/client.ts#L56
  DOGE: [44, 3, 0, 0, 0],
};

export const [derivationPaths, setDerivationPaths] =
  createStore<DerivationPaths>({ ...INITIAL_DERIVATION_PATHS });

const resetDerivationPaths = () =>
  setDerivationPaths({ ...INITIAL_DERIVATION_PATHS });

// ------------------------
// Form
// ------------------------

export const INITIAL_FORM: Form = {
  network: "mainnet",
  index: 0,
  phrase: "",
  source: INITIAL_SOURCE_TYPE,
};

const [form, setForm] = createStore<Form>({ ...INITIAL_FORM });
const setNetwork = (network: Network) => setForm("network", network);
const setIndex = (index: number) => setForm("index", index);
const setPhrase = (phrase: string, source: FormSource) =>
  setForm((current) => ({ ...current, phrase, source }));
const setSource = (source: FormSource) =>
  // we reset phrase whenever source has been changed
  setForm((current) => ({ ...current, phrase: "", source }));
// Reset form data, but keep source
const resetForm = () =>
  setForm((current) => ({ ...INITIAL_FORM, source: current.source }));
export { form, setNetwork, setIndex, setPhrase, setSource };

/**
 * Effect to update index of `DerivationPaths`
 * Whenever `form.index` changes, all `setDerivationPaths` will be updated
 */
createEffect(() => {
  CHAINS.forEach((chain) => {
    setDerivationPaths(chain, setDerivationPathIndex(form.index));
  });
});

// ------------------------
// Addresses
// ------------------------

/** Helper top create AddressResource */
const createAddressRessource = (): {
  resource: Resource<string>;
  get: Setter<GetAddressParams>;
  reset: () => string;
} => {
  // Signal to trigger loading of addresses - null by default to keep `createResource` stream cold (not fetching by default)
  const [params, setParams] = createSignal<GetAddressParams>(null);
  const [resource, { mutate }] = createResource(params, getAddress, {});
  return {
    resource /* initial|loading|error|value() */,
    get: setParams /* re-trigger address loading by passing params */,
    reset: () => mutate(null) /* reset resource  to initial */,
  };
};

// THORChain
const {
  resource: addressResourceThor,
  get: getAddressThor,
  reset: resetAddressThor,
} = createAddressRessource();

// Maya
const {
  resource: addressResourceMaya,
  get: getAddressMaya,
  reset: resetAddressMaya,
} = createAddressRessource();

// BNB
const {
  resource: addressResourceBnb,
  get: getAddressBnb,
  reset: resetAddressBnb,
} = createAddressRessource();

// Cosmos
const {
  resource: addressResourceGaia,
  get: getAddressGaia,
  reset: resetAddressGaia,
} = createAddressRessource();

// ETH
const {
  resource: addressResourceEth,
  get: getAddressEth,
  reset: resetAddressEth,
} = createAddressRessource();

// BSC
const {
  resource: addressResourceBsc,
  get: getAddressBsc,
  reset: resetAddressBsc,
} = createAddressRessource();

// AVAX
const {
  resource: addressResourceAvax,
  get: getAddressAvax,
  reset: resetAddressAvax,
} = createAddressRessource();

// BTC
const {
  resource: addressResourceBtc,
  get: getAddressBtc,
  reset: resetAddressBtc,
} = createAddressRessource();

// BCH
const {
  resource: addressResourceBch,
  get: getAddressBch,
  reset: resetAddressBch,
} = createAddressRessource();

// LTC
const {
  resource: addressResourceLtc,
  get: getAddressLtc,
  reset: resetAddressLtc,
} = createAddressRessource();

// DOGE
const {
  resource: addressResourceDoge,
  get: getAddressDoge,
  reset: resetAddressDoge,
} = createAddressRessource();

export const INITIAL_ADDRESSES: Addresses = [
  {
    chain: THORChain,
    active: true,
    resource: addressResourceThor,
  },
  { chain: MAYAChain, resource: addressResourceMaya, active: true },
  { chain: BNBChain, resource: addressResourceBnb, active: true },
  { chain: GAIAChain, resource: addressResourceGaia, active: true },
  { chain: ETHChain, resource: addressResourceEth, active: true },
  { chain: BSCChain, resource: addressResourceBsc, active: true },
  { chain: AVAXChain, resource: addressResourceAvax, active: true },
  { chain: BTCChain, resource: addressResourceBtc, active: true },
  { chain: BCHChain, resource: addressResourceBch, active: true },
  { chain: LTCChain, resource: addressResourceLtc, active: true },
  { chain: DOGEChain, resource: addressResourceDoge, active: true },
];

const [addresses, setAddresses] = createStore<Addresses>([
  ...INITIAL_ADDRESSES,
]);

const resetAddresses = () => {
  resetAddressThor();
  resetAddressMaya();
};

export { addresses };

/**
 * Setter to en- or disable addresses to derive
 */
export const setAddressActive = (chain: Chain, active: boolean) =>
  setAddresses(({ chain: c }) => c === chain, "active", active);

/**
 * Setter to en- or disable addresses to derive
 */
const resetAddressResource = (chain: Chain) => {
  switch (chain) {
    case MAYAChain:
      resetAddressMaya();
      break;
    case THORChain:
      resetAddressThor();
      break;
    case BNBChain:
      resetAddressBnb();
      break;
    case GAIAChain:
      resetAddressGaia();
      break;
    case ETHChain:
      resetAddressEth();
      break;
    case BSCChain:
      resetAddressBsc();
      break;
    case AVAXChain:
      resetAddressAvax();
      break;
    case BTCChain:
      resetAddressBtc();
      break;
    case BCHChain:
      resetAddressBch();
      break;
    case LTCChain:
      resetAddressLtc();
      break;
    case DOGEChain:
      resetAddressDoge();
      break;
  }
};

/**
 * Effect to reset addresses whenever phrase is empty
 */
createEffect(() => {
  if (!form.phrase) {
    // dispose addresses
    addresses.forEach(({ chain }) => resetAddressResource(chain));
  }
});

const deriveAddress = (params: GetAddressParams) => {
  switch (params.chain) {
    case MAYAChain:
      getAddressMaya(params);
      break;
    case THORChain:
      getAddressThor(params);
      break;
    case BNBChain:
      getAddressBnb(params);
      break;
    case GAIAChain:
      getAddressGaia(params);
      break;
    case ETHChain:
      getAddressEth(params);
      break;
    case BSCChain:
      getAddressBsc(params);
      break;
    case AVAXChain:
      getAddressAvax(params);
      break;
    case BTCChain:
      getAddressBtc(params);
      break;
    case BCHChain:
      getAddressBch(params);
      break;
    case LTCChain:
      getAddressLtc(params);
      break;
    case DOGEChain:
      getAddressDoge(params);
      break;
  }
};

export const deriveAddressByChain = ({ chain, path }: GetAddressByChain) => {
  setDerivationPaths(chain, path);
  if (!!form.phrase) {
    deriveAddress({
      chain,
      network: form.network,
      path,
      phrase: form.phrase,
    });
  }
};

const deriveAddresses = () => {
  addresses.forEach(({ chain, active }) => {
    if (active) {
      deriveAddress({
        chain,
        network: form.network,
        path: derivationPaths[chain],
        phrase: form.phrase,
      });
    }
  });
};

/**
 * Effect to derive addresses
 * whenever a phrase, network or index have been changed
 */
createEffect<{
  phrase: string;
  index: number;
  network: Network;
}>(
  (prev) => {
    // dirty check is needed
    // to avoid running effect every time
    // even by changing one value of `form` store only
    if (
      !!form.phrase &&
      (prev.phrase != form.phrase ||
        prev.network != form.network ||
        prev.index != form.index)
    ) {
      deriveAddresses();
    }
    // next value to compare
    return {
      phrase: form.phrase,
      network: form.network,
      index: form.index,
    };
  },
  // initial values
  { network: form.network, phrase: form.phrase, index: form.index }
);

/**
 * Loading state of deriving ALL addresses
 */
export const addressesLoading = () =>
  addresses.some(({ resource }) => resource.loading);

export const resetData = () => {
  resetForm();
  resetDerivationPaths();
  resetAddresses();
};

import { Addresses, Chain, GetAddressParams, Network } from "./types";

import { createStore } from "solid-js/store";
import {
  createEffect,
  createResource,
  createSignal,
  Resource,
  Setter,
} from "solid-js";
import { getAddress } from "./service";

export const CHAINS: Chain[] = ["Maya", "THORChain"];

// ------------------------
// Form
// ------------------------

export type Form = {
  network: Network /* 'mainnet' or 'stagenet' */;
  index: number /* wallet index */;
  phrase: string /* phrase - mnemonic or keystore based */;
};

export const INITIAL_FORM: Form = {
  network: "mainnet",
  index: 0,
  phrase: "",
};

const [form, setForm] = createStore<Form>({ ...INITIAL_FORM });
const setNetwork = (network: Network) => setForm("network", network);
const setIndex = (index: number) => setForm("index", index);
const setPhrase = (phrase: string) => setForm("phrase", phrase);
const resetForm = () => setForm({ ...INITIAL_FORM });
export { form, setNetwork, setIndex, setPhrase, resetForm as resetPhrase };

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

export const INITIAL_ADDRESSES: Addresses = [
  {
    chain: "THORChain",
    active: true,
    resource: addressResourceThor,
  },
  { chain: "Maya", resource: addressResourceMaya, active: true },
];

const [addresses, setAddresses] = createStore<Addresses>(INITIAL_ADDRESSES);

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
    case "Maya":
      resetAddressMaya();
      break;
    case "THORChain":
      resetAddressThor();
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

const refetchAddress = (params: GetAddressParams) => {
  switch (params.chain) {
    case "Maya":
      getAddressMaya(params);
      break;
    case "THORChain":
      getAddressThor(params);
      break;
  }
};

export const deriveAddresses = (overrides?: {
  network?: Network;
  phrase?: string;
  index?: number;
}) => {
  addresses.forEach(({ chain, active }) => {
    if (active) {
      refetchAddress({
        chain,
        network: overrides?.network || form.network,
        index: overrides?.index || form.index,
        phrase: overrides?.phrase || form.phrase,
      });
    }
  });
};

/**
 * Effect to derive addresses whenever a phrase has been changed
 */
createEffect(() => {
  if (form.phrase) {
    deriveAddresses({ network: form.network, index: form.index });
  }
});

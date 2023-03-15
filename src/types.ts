import { Network as ClientNetwork } from "@xchainjs/xchain-client";
import { Resource } from "solid-js";

export type Network = `${ClientNetwork.Mainnet}` | `${ClientNetwork.Stagenet}`;

export type Chain = "Maya" | "THORChain";

export type AddressResource = Resource<string>;
export type Address = {
  chain: Chain;
  resource: AddressResource;
  active: boolean;
};
export type Addresses = Address[];

export type DerivationPath = [number, number, number, number, number];

export type DerivationPaths = Record<Chain, DerivationPath>;

export type GetAddressParams = {
  network: Network;
  phrase: string;
  path: DerivationPath;
  chain: Chain;
};

export type GetAddressByChain = {
  path: DerivationPath;
  chain: Chain;
};

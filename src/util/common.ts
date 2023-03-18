import { Network as ClientNetwork } from "@xchainjs/xchain-client";
import { MAYAChain } from "@xchainjs/xchain-mayachain";
import { THORChain } from "@xchainjs/xchain-thorchain";
import { CHAINS } from "../const";
import { Chain, DerivationPath, Network } from "../types";

export const chainToString = (chain: Chain) => {
  switch (chain) {
    case MAYAChain:
      return 'MAYAChain'
    case THORChain:
      return 'THORChain'
  }
}

export const toClientNetwork = (network: Network): ClientNetwork => {
  switch (network) {
    case "mainnet":
      return ClientNetwork.Mainnet;
    case "stagenet":
      return ClientNetwork.Stagenet;
  }
};

/**
 * Converts `DerivationPath` to a readable string
 */
export const derivationPathToString = (p: DerivationPath) =>
  `m/${p[0]}'/${p[1]}'/${p[2]}'/${p[3]}/${p[4]}`;

/**
 * Creates a `rootDerivationPath` needed by XChain Clients
 *
 * Example THORChain:
 * Instead of  `m/44'/931'/0'/0/0`
 * XChain expects `44'/931'/0'/0` (no `m`, no `index`)
 */
export const getRootDerivationPath = (p: DerivationPath) =>
  `${p[0]}'/${p[1]}'/${p[2]}'/${p[3]}/`;

export const getDerivationPathIndex = (p: DerivationPath) => p[4];
export const setDerivationPathIndex =
  (index: number) =>
  (p: DerivationPath): DerivationPath =>
    [p[0], p[1], p[2], p[3], index];
export const getDerivationPathChange = (p: DerivationPath) => p[3];
export const setDerivationPathChange =
  (change: number) =>
  (p: DerivationPath): DerivationPath =>
    [p[0], p[1], p[2], change, p[4]];
export const getDerivationPathAcccount = (p: DerivationPath) => p[2];
export const setDerivationPathAccount =
  (account: number) =>
  (p: DerivationPath): DerivationPath =>
    [p[0], p[1], account, p[3], p[4]];

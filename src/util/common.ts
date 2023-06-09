import { BNBChain } from "@xchainjs/xchain-binance";
import { BTCChain } from "@xchainjs/xchain-bitcoin";
import { BCHChain } from "@xchainjs/xchain-bitcoincash";
import { Network as ClientNetwork } from "@xchainjs/xchain-client";
import { GAIAChain } from "@xchainjs/xchain-cosmos";
import { DOGEChain } from "@xchainjs/xchain-doge";
import { LTCChain } from "@xchainjs/xchain-litecoin";
import { MAYAChain } from "@xchainjs/xchain-mayachain";
import { THORChain } from "@xchainjs/xchain-thorchain";
import { Address } from "@xchainjs/xchain-util";
import { AVAXChain, BSCChain, ETHChain } from "../const";
import { Chain, DerivationPath, Network } from "../types";

export const chainToString = (chain: Chain) => {
  switch (chain) {
    case MAYAChain:
      return "MAYAChain";
    case THORChain:
      return "THORChain";
    case BNBChain:
      return "Binance Chain";
    case GAIAChain:
      return "Cosmos";
    case ETHChain:
      return "Ethereum";
    case BSCChain:
      return "Binance Smart Chain";
    case AVAXChain:
      return "Avalanche";
    case BTCChain:
      return "Bitcoin";
    case BCHChain:
      return "Bitcoin Cash";
    case LTCChain:
      return "Litecoin";
    case DOGEChain:
      return "Dogecoin";
  }
};

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

export const trimAddress = (addr: Address) => {
  const l = addr.length;
  return l <= 10 ? addr : `${addr.substring(0, 6)}...${addr.substring(l - 4)}`;
};

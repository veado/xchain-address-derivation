import { AVAXChain } from "@xchainjs/xchain-avax";
import { BNBChain } from "@xchainjs/xchain-binance";
import { BTCChain } from "@xchainjs/xchain-bitcoin";
import { BCHChain } from "@xchainjs/xchain-bitcoincash";
// import { BSCChain } from "@xchainjs/xchain-bsc";
import { GAIAChain } from "@xchainjs/xchain-cosmos";
import { DOGEChain } from "@xchainjs/xchain-doge";
import { ETHChain } from "@xchainjs/xchain-ethereum";
import { LTCChain } from "@xchainjs/xchain-litecoin";
import { MAYAChain } from "@xchainjs/xchain-mayachain";
import { THORChain } from "@xchainjs/xchain-thorchain";
import { FormSource } from "./types";

export const INITIAL_SOURCE_TYPE: FormSource = "mnemonic";

// [xchain-bsc] Fix type of BSCChain
// https://github.com/xchainjs/xchainjs-lib/pull/736
export const BSCChain = 'BSC' as const

export const CHAINS = [
  MAYAChain,
  THORChain,
  BNBChain,
  GAIAChain,
  ETHChain,
  BSCChain,
  AVAXChain,
  BTCChain,
  BCHChain,
  LTCChain,
  DOGEChain
] as const;

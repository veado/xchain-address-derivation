import { BNBChain } from "@xchainjs/xchain-binance";
import { BTCChain } from "@xchainjs/xchain-bitcoin";
import { BCHChain } from "@xchainjs/xchain-bitcoincash";
import { GAIAChain } from "@xchainjs/xchain-cosmos";
import { DOGEChain } from "@xchainjs/xchain-doge";
import { LTCChain } from "@xchainjs/xchain-litecoin";
import { MAYAChain } from "@xchainjs/xchain-mayachain";
import { THORChain } from "@xchainjs/xchain-thorchain";
import { FormSource } from "./types";

export const INITIAL_SOURCE_TYPE: FormSource = "mnemonic";

// Note: EVM chains needs to be defined, because we are using `xchain-evm` only
// and don't wan't to install `xchain-avax|bsc|eth` just to use these constants.
//
// BSCChain - https://github.com/xchainjs/xchainjs-lib/blob/master/packages/xchain-bsc/src/const.ts#L15
export const BSCChain = "BSC" as const;
// AVAXChain https://github.com/xchainjs/xchainjs-lib/blob/master/packages/xchain-avax/src/const.ts#L17
export const AVAXChain = "AVAX" as const;
// ETHChain - https://github.com/xchainjs/xchainjs-lib/blob/master/packages/xchain-ethereum/src/const.ts#L26
export const ETHChain = "ETH" as const;

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
  DOGEChain,
] as const;

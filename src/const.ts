import { BNBChain } from "@xchainjs/xchain-binance";
import { BSCChain } from "@xchainjs/xchain-bsc";
import { GAIAChain } from "@xchainjs/xchain-cosmos";
import { ETHChain } from "@xchainjs/xchain-ethereum";
import { MAYAChain } from "@xchainjs/xchain-mayachain";
import { THORChain } from "@xchainjs/xchain-thorchain";
import { FormSource } from "./types";

export const INITIAL_SOURCE_TYPE: FormSource = "mnemonic";

export const CHAINS = [MAYAChain, THORChain, BNBChain, GAIAChain, ETHChain, BSCChain] as const;

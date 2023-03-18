import { BNBChain } from "@xchainjs/xchain-binance";
import { GAIAChain } from "@xchainjs/xchain-cosmos";
import { MAYAChain } from "@xchainjs/xchain-mayachain";
import { THORChain } from "@xchainjs/xchain-thorchain";
import { FormSource } from "./types";

export const INITIAL_SOURCE_TYPE: FormSource = "mnemonic";

export const CHAINS = [MAYAChain, THORChain, BNBChain, GAIAChain] as const;

import { Client as EvmClient } from "@xchainjs/xchain-evm";
import { BNBChain, Client as BnbClient } from "@xchainjs/xchain-binance";
import { BTCChain, Client as BtcClient } from "@xchainjs/xchain-bitcoin";
import { BCHChain, Client as BchClient } from "@xchainjs/xchain-bitcoincash";
import { Client as GaiaClient, GAIAChain } from "@xchainjs/xchain-cosmos";
import { Client as DogeClient, DOGEChain } from "@xchainjs/xchain-doge";
import { Client as LtcClient, LTCChain } from "@xchainjs/xchain-litecoin";
import { Client as MayaClient, MAYAChain } from "@xchainjs/xchain-mayachain";
import { Client as ThorClient, THORChain } from "@xchainjs/xchain-thorchain";
import { delay } from "@xchainjs/xchain-util";
import { AVAXChain, BSCChain, ETHChain } from "./const";
import { GetAddressParams } from "./types";
import {
  getRootDerivationPath,
  toClientNetwork,
  getDerivationPathIndex,
  chainToString,
} from "./util/common";

const getMayaAddress = async ({
  network,
  phrase,
  path,
}: GetAddressParams): Promise<string> => {
  const rootDerivationPath = getRootDerivationPath(path);
  const client = new MayaClient({
    network: toClientNetwork(network),
    phrase,
    rootDerivationPaths: {
      mainnet: rootDerivationPath,
      stagenet: rootDerivationPath,
      testnet: null,
    },
  });
  await delay(300);
  const index = getDerivationPathIndex(path);
  return client.getAddress(index);
};

const getTHORChainAddress = async ({
  network,
  phrase,
  path,
}: GetAddressParams): Promise<string> => {
  const rootDerivationPath = getRootDerivationPath(path);
  const client = new ThorClient({
    network: toClientNetwork(network),
    phrase,
    rootDerivationPaths: {
      mainnet: rootDerivationPath,
      stagenet: rootDerivationPath,
      testnet: null,
    },
  });
  await delay(300);
  const index = getDerivationPathIndex(path);
  return client.getAddress(index);
};

const getBnbAddress = async ({
  network,
  phrase,
  path,
}: GetAddressParams): Promise<string> => {
  const rootDerivationPath = getRootDerivationPath(path);
  const client = new BnbClient({
    network: toClientNetwork(network),
    phrase,
    rootDerivationPaths: {
      mainnet: rootDerivationPath,
      stagenet: rootDerivationPath,
      testnet: null,
    },
  });
  // delay to relax UI
  await delay(300);
  const index = getDerivationPathIndex(path);
  return client.getAddress(index);
};

const getGaiaAddress = async ({
  network,
  phrase,
  path,
}: GetAddressParams): Promise<string> => {
  const rootDerivationPath = getRootDerivationPath(path);
  const client = new GaiaClient({
    network: toClientNetwork(network),
    phrase,
    rootDerivationPaths: {
      mainnet: rootDerivationPath,
      stagenet: rootDerivationPath,
      testnet: null,
    },
  });
  // delay to relax UI
  await delay(300);
  const index = getDerivationPathIndex(path);
  return client.getAddress(index);
};

const getEthAddress = async ({
  network,
  phrase,
  path,
}: GetAddressParams): Promise<string> => {
  const rootDerivationPath = getRootDerivationPath(path);
  // No need to use `xchain-ethereum`s `Client`
  // It extends from `EvmClient`,
  // which provides all we need to derive addresses
  const client = new EvmClient({
    chain: null,
    gasAsset: null,
    gasAssetDecimals: null,
    defaults: null,
    providers: null,
    explorerProviders: null,
    dataProviders: null,
    feeBounds: null,
    network: toClientNetwork(network),
    phrase,
    rootDerivationPaths: {
      mainnet: rootDerivationPath,
      stagenet: rootDerivationPath,
      testnet: null,
    },
  });
  // delay to relax UI
  await delay(300);
  const index = getDerivationPathIndex(path);
  return client.getAddress(index);
};

const getBscAddress = async ({
  network,
  phrase,
  path,
}: GetAddressParams): Promise<string> => {
  const rootDerivationPath = getRootDerivationPath(path);
  // No need to use `xchain-bsc`s `Client`
  // It extends from `EvmClient`,
  // which provides all we need to derive addresses
  const client = new EvmClient({
    chain: null,
    gasAsset: null,
    gasAssetDecimals: null,
    defaults: null,
    providers: null,
    explorerProviders: null,
    dataProviders: null,
    feeBounds: null,
    network: toClientNetwork(network),
    phrase,
    rootDerivationPaths: {
      mainnet: rootDerivationPath,
      stagenet: rootDerivationPath,
      testnet: null,
    },
  });
  // delay to relax UI
  await delay(300);
  const index = getDerivationPathIndex(path);
  return client.getAddress(index);
};

const getAvaxAddress = async ({
  network,
  phrase,
  path,
}: GetAddressParams): Promise<string> => {
  const rootDerivationPath = getRootDerivationPath(path);
  // No need to use `xchain-avax` `Client`
  // It extends from `EvmClient`,
  // which provides all we need to derive addresses
  const client = new EvmClient({
    chain: null,
    gasAsset: null,
    gasAssetDecimals: null,
    defaults: null,
    providers: null,
    explorerProviders: null,
    dataProviders: null,
    feeBounds: null,
    network: toClientNetwork(network),
    phrase,
    rootDerivationPaths: {
      mainnet: rootDerivationPath,
      stagenet: rootDerivationPath,
      testnet: null,
    },
  });
  // delay to relax UI
  await delay(300);
  const index = getDerivationPathIndex(path);
  return client.getAddress(index);
};

const getBtcAddress = async ({
  network,
  phrase,
  path,
}: GetAddressParams): Promise<string> => {
  const rootDerivationPath = getRootDerivationPath(path);
  const client = new BtcClient({
    network: toClientNetwork(network),
    sochainApiKey: "empty", // not needed
    phrase,
    rootDerivationPaths: {
      mainnet: rootDerivationPath,
      stagenet: rootDerivationPath,
      testnet: null,
    },
  });
  // delay to relax UI
  await delay(300);
  const index = getDerivationPathIndex(path);
  return client.getAddress(index);
};

const getBchAddress = async ({
  network,
  phrase,
  path,
}: GetAddressParams): Promise<string> => {
  const rootDerivationPath = getRootDerivationPath(path);
  const client = new BchClient({
    network: toClientNetwork(network),
    phrase,
    rootDerivationPaths: {
      mainnet: rootDerivationPath,
      stagenet: rootDerivationPath,
      testnet: null,
    },
  });
  // delay to relax UI
  await delay(300);
  const index = getDerivationPathIndex(path);
  return client.getAddress(index);
};

const getLtcAddress = async ({
  network,
  phrase,
  path,
}: GetAddressParams): Promise<string> => {
  const rootDerivationPath = getRootDerivationPath(path);
  const client = new LtcClient({
    network: toClientNetwork(network),
    phrase,
    sochainApiKey: "empty", // not needed
    rootDerivationPaths: {
      mainnet: rootDerivationPath,
      stagenet: rootDerivationPath,
      testnet: null,
    },
  });
  // delay to relax UI
  await delay(300);
  const index = getDerivationPathIndex(path);
  return client.getAddress(index);
};

const getDogeAddress = async ({
  network,
  phrase,
  path,
}: GetAddressParams): Promise<string> => {
  const rootDerivationPath = getRootDerivationPath(path);
  const client = new DogeClient({
    network: toClientNetwork(network),
    phrase,
    sochainApiKey: "empty", // not needed
    rootDerivationPaths: {
      mainnet: rootDerivationPath,
      stagenet: rootDerivationPath,
      testnet: null,
    },
  });
  // delay to relax UI
  await delay(300);
  const index = getDerivationPathIndex(path);
  return client.getAddress(index);
};

export const getAddress = async ({
  network,
  phrase,
  path,
  chain,
}: GetAddressParams): Promise<string> => {
  const get = () => {
    switch (chain) {
      case THORChain:
        return getTHORChainAddress({ network, phrase, path, chain });
      case MAYAChain:
        return getMayaAddress({ network, phrase, path, chain });
      case BNBChain:
        return getBnbAddress({ network, phrase, path, chain });
      case GAIAChain:
        return getGaiaAddress({ network, phrase, path, chain });
      case ETHChain:
        return getEthAddress({ network, phrase, path, chain });
      case BSCChain:
        return getBscAddress({ network, phrase, path, chain });
      case AVAXChain:
        return getAvaxAddress({ network, phrase, path, chain });
      case BTCChain:
        return getBtcAddress({ network, phrase, path, chain });
      case BCHChain:
        return getBchAddress({ network, phrase, path, chain });
      case LTCChain:
        return getLtcAddress({ network, phrase, path, chain });
      case DOGEChain:
        return getDogeAddress({ network, phrase, path, chain });
    }
  };

  return get().catch((e) => {
    console.error(`getAddress for ${chainToString(chain)} failed. ${e}`);
    return e;
  });
};

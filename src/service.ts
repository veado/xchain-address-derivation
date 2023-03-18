import { AVAXChain, Client as AvaxClient, defaultAvaxParams } from "@xchainjs/xchain-avax";
import { BNBChain, Client as BnbClient } from "@xchainjs/xchain-binance";
import { BSCChain, Client as BscClient, defaultBscParams } from "@xchainjs/xchain-bsc";
import { Client as GaiaClient, GAIAChain } from "@xchainjs/xchain-cosmos";
import { Client as EthClient, ETHChain } from "@xchainjs/xchain-ethereum";
import { Client as MayaClient, MAYAChain } from "@xchainjs/xchain-mayachain";
import { Client as ThorClient, THORChain } from "@xchainjs/xchain-thorchain";
import { delay } from "@xchainjs/xchain-util";
import { GetAddressParams } from "./types";
import {
  getRootDerivationPath,
  toClientNetwork,
  getDerivationPathIndex,
} from "./util/common";

const getMayaAddress = async ({
  network,
  phrase,
  path,
  chain,
}: GetAddressParams): Promise<string> => {
  try {
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
    // delay to relax UI
    await delay(300);
    const address = client.getAddress(getDerivationPathIndex(path));
    return address;
  } catch (e) {
    console.error(`getAddress ${chain} error: ${e}`);
    return e;
  }
};

const getTHORChainAddress = async ({
  network,
  phrase,
  path,
  chain,
}: GetAddressParams): Promise<string> => {
  try {
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
    // delay to relax UI
    await delay(300);
    const address = client.getAddress(getDerivationPathIndex(path));
    return address;
  } catch (e) {
    console.error(`getAddress ${chain} error: ${e}`);
    return e;
  }
};

const getBnbAddress = async ({
  network,
  phrase,
  path,
  chain,
}: GetAddressParams): Promise<string> => {
  try {
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
    const address = client.getAddress(getDerivationPathIndex(path));
    return address;
  } catch (e) {
    console.error(`getAddress ${chain} error: ${e}`);
    return e;
  }
};

const getGaiaAddress = async ({
  network,
  phrase,
  path,
  chain,
}: GetAddressParams): Promise<string> => {
  try {
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
    const address = client.getAddress(getDerivationPathIndex(path));
    return address;
  } catch (e) {
    console.error(`getAddress ${chain} error: ${e}`);
    return e;
  }
};

const getEthAddress = async ({
  network,
  phrase,
  path,
  chain,
}: GetAddressParams): Promise<string> => {
  try {
    const rootDerivationPath = getRootDerivationPath(path);
    const client = new EthClient({
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
    const address = client.getAddress(getDerivationPathIndex(path));
    return address;
  } catch (e) {
    console.error(`getAddress ${chain} error: ${e}`);
    return e;
  }
};

const getBscAddress = async ({
  network,
  phrase,
  path,
  chain,
}: GetAddressParams): Promise<string> => {
  try {
    const rootDerivationPath = getRootDerivationPath(path);
    const client = new BscClient({
      ...defaultBscParams,
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
    const address = client.getAddress(getDerivationPathIndex(path));
    return address;
  } catch (e) {
    console.error(`getAddress ${chain} error: ${e}`);
    return e;
  }
};

const getAvaxAddress = async ({
  network,
  phrase,
  path,
  chain,
}: GetAddressParams): Promise<string> => {
  try {
    const rootDerivationPath = getRootDerivationPath(path);
    const client = new AvaxClient({
      ...defaultAvaxParams,
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
    const address = client.getAddress(getDerivationPathIndex(path));
    return address;
  } catch (e) {
    console.error(`getAddress ${chain} error: ${e}`);
    return e;
  }
};

export const getAddress = ({
  network,
  phrase,
  path,
  chain,
}: GetAddressParams): Promise<string> => {
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
  }
};

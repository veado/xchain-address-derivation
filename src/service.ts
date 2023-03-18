import { BNBChain, Client as BnbClient } from "@xchainjs/xchain-binance";
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
  }
};

import { Client as MayaClient, MAYAChain } from "@xchainjs/xchain-mayachain";
import { Client as ThorClient, THORChain } from "@xchainjs/xchain-thorchain";
import { delay } from "@xchainjs/xchain-util";
import { Chain, GetAddressParams, Network } from "./types";
import { getRootDerivationPath, toClientNetwork } from "./util/common";

const getMayaAddress = async ({
  network,
  phrase,
  path,
}: Omit<GetAddressParams, "chain">): Promise<string> => {
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
    const address = client.getAddress(path[4]);
    return address;
  } catch (e) {
    console.error("getAddress Maya error:", e);
    return e;
  }
};

const getTHORChainAddress = async ({
  network,
  phrase,
  path,
}: Omit<GetAddressParams, "chain">): Promise<string> => {
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
    const address = client.getAddress(path[4]);
    return address;
  } catch (e) {
    console.error("getAddress THOR error:", e);
    return e;
  }
};

export const getAddress = ({
  network,
  phrase,
  path,
  chain,
}: GetAddressParams & { chain: Chain }): Promise<string> => {
  switch (chain) {
    case THORChain:
      return getTHORChainAddress({ network, phrase, path });
    case MAYAChain:
      return getMayaAddress({ network, phrase, path });
  }
};

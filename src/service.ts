import { Client as MayaClient } from "@xchainjs/xchain-mayachain";
import { Client as ThorClient } from "@xchainjs/xchain-thorchain";
import { delay } from "@xchainjs/xchain-util";
import { Chain, GetAddressParams, Network } from "./types";
import { toClientNetwork } from "./util";

const getMayaAddress = async ({
  network,
  phrase,
  index,
}: Omit<GetAddressParams, "chain">): Promise<string> => {
  try {
    const client = new MayaClient({
      network: toClientNetwork(network),
      phrase,
    });
    // delay to relax UI
    await delay(300);
    const address = client.getAddress(index);
    console.log("address:", address);
    return address;
  } catch (e) {
    console.log("getAddress Maya error:", e);
    return e;
  }
};

const getTHORChainAddress = async ({
  network,
  phrase,
  index,
}: Omit<GetAddressParams, "chain">): Promise<string> => {
  try {
    const client = new ThorClient({
      network: toClientNetwork(network),
      phrase,
    });
    // delay to relax UI
    await delay(300);
    const address = client.getAddress(index);
    console.log("address:", address);
    return address;
  } catch (e) {
    console.log("getAddress THOR error:", e);
    return e;
  }
};

export const getAddress = ({
  network,
  phrase,
  index,
  chain,
}: GetAddressParams & { chain: Chain }): Promise<string> => {
  console.log("getAddress ", chain);
  switch (chain) {
    case "THORChain":
      return getTHORChainAddress({ network, phrase, index });
    case "Maya":
      return getMayaAddress({ network, phrase, index });
  }
};

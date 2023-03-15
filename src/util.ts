import { Network as ClientNetwork } from "@xchainjs/xchain-client";
import { Network } from "./types";

import { validatePhrase } from "@xchainjs/xchain-crypto";
import * as yup from "yup";

type PhraseSchema = {
  phrase: string;
  index: number;
};

export const phraseFormSchema = (defaults: {
  index: number;
}): yup.ObjectSchema<PhraseSchema> =>
  yup.object({
    phrase: yup
      .string()
      .required("Required field")
      .test({
        name: "is-phrase",
        test(value, ctx) {
          const l = value && value.match(/(\w+)\s{0,1}/g).length;
          if (l !== 12 && l !== 24) {
            return ctx.createError({
              message: "Mnemonic should have 12 or 24 words",
            });
          }

          if (!validatePhrase(value)) {
            return ctx.createError({ message: "Invalid phrase ..." });
          }

          return true;
        },
      }),
    index: yup.number().required().integer().min(0).default(defaults.index),
  });

export const toClientNetwork = (network: Network): ClientNetwork => {
  switch (network) {
    case "mainnet":
      return ClientNetwork.Mainnet;
    case "stagenet":
      return ClientNetwork.Stagenet;
  }
};

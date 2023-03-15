import { validatePhrase } from "@xchainjs/xchain-crypto";
import * as yup from "yup";

type PhraseSchema = {
  phrase: string;
  index: number;
};

const derivationPathItem = yup.number().required().integer().min(0);

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
    index: derivationPathItem.default(defaults.index),
  });

type EditableDerivationPathSchema = {
  account: number;
  change: number;
  index: number;
};

export const editableDerivationPathSchema = (defaults: {
  account: number;
  change: number;
  index: number;
}): yup.ObjectSchema<EditableDerivationPathSchema> =>
  yup.object({
    account: derivationPathItem.default(defaults.account),
    change: derivationPathItem.default(defaults.change),
    index: derivationPathItem.default(defaults.index),
  });

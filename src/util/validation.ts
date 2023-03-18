import {
  decryptFromKeystore,
  validatePhrase,
  type Keystore,
} from "@xchainjs/xchain-crypto";
import * as yup from "yup";

type PhraseSchema = {
  phrase: string;
  index: number;
};

const derivationPathItem = yup.number().required().integer().min(0);
const phraseSchema = yup
  .string()
  .required("Phrase is required")
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
  });

export const phraseFormSchema = (defaults: {
  index: number;
}): yup.ObjectSchema<PhraseSchema> =>
  yup.object({
    phrase: phraseSchema,
    index: derivationPathItem.default(defaults.index),
  });

const keystoreJSONSchema = yup
  .object({
    crypto: yup
      .object({
        cipher: yup.string().required(),
        ciphertext: yup.string().required(),
        cipherparams: yup
          .object({
            iv: yup.string().required(),
          })
          .required(),
        kdf: yup.string().required(),
        kdfparams: yup
          .object({
            prf: yup.string().required(),
            dklen: yup.number().required(),
            salt: yup.string().required(),
            c: yup.number().required(),
          })
          .required(),
        mac: yup.string().required(),
      })
      .required(),
    id: yup.string(),
    version: yup.number().required(),
    meta: yup.string().required().equals(["xchain-keystore"]),
  })
  .json();

type KeystoreSchema = {
  keystore: string;
  index: number;
  password: string;
};

export const keystoreFormSchema = (defaults: {
  index: number;
}): yup.ObjectSchema<KeystoreSchema> =>
  yup.object({
    keystore: yup
      // `string` instead of `JSON`, because `keystoreJSONSchema` does not work here:
      // It throws `required` vs. `optional` field errors (maybe a `yup` bug ???)
      .string()
      .required("Keystore is missing.")
      // 3-step validation of keystore
      // 1. JSON content
      // 2. JSON structure
      // 3. Try to get phrase from it
      .test({
        name: "is-keystore",
        async test(value, ctx) {
          let kestoreJSON: JSON;
          // Try to parse keystore to make sure it's a JSON
          try {
            kestoreJSON = JSON.parse(value);
          } catch (error) {
            return ctx.createError({
              message: `Invalid keystore content or format. ${
                error.message || error.toString()
              }`,
            });
          }

          // Validate keystore's JSON structure
          try {
            const _ = await keystoreJSONSchema.validate(kestoreJSON);
          } catch (error) {
            return ctx.createError({
              message: `Invalid JSON format of keystore file. ${
                error.message || error.toString()
              }`,
            });
          }

          const password = ctx.parent["password"];
          // Try to decrypt phrase from keystore.
          // `phrase needs to be set before - if not, make sure form is validated *before* submitting any form data
          if (!!password) {
            try {
              const phrase = await decryptFromKeystore(
                // by validating keystore before we already know it's type `Keystore`
                kestoreJSON as unknown as Keystore,
                password
              );
              // validate Phrase
              const validPhrase = await phraseSchema.isValid(phrase);
              if (!validPhrase) {
                return ctx.createError({
                  message: "Invalid Phrase decrypted from Keystore",
                });
              }
            } catch (error) {
              return ctx.createError({
                message: `Could not decrypt phrase from keystore. ${
                  error.message || error.toString()
                }.`,
              });
            }
          }
          return true;
        },
      }),
    password: yup.string().required("Password is required").min(1),
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

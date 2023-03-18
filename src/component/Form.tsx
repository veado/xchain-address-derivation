import { Component, Show, JSX, Match, Switch } from "solid-js";

import { useFormHandler, yupSchema } from "solid-form-handler";
import {
  setPhrase,
  setNetwork,
  setIndex,
  resetData,
  setSource,
  addressesLoading,
} from "../store";
import { keystoreFormSchema, phraseFormSchema } from "../util/validation";
import * as T from "../types";
import { decryptFromKeystore } from "@xchainjs/xchain-crypto";
import { LoaderIcon } from "./icon/LoaderIcon";
import { CheckIcon } from "./icon/CheckIcon";

export type Props = { form: T.Form } & JSX.HTMLAttributes<HTMLElement>;

export const Form: Component<Props> = (props) => {
  const isKeystoreForm = () => props.form.source === "keystore";
  const isPhraseForm = () => props.form.source === "mnemonic";

  const phraseFormHandler = useFormHandler(
    yupSchema(phraseFormSchema({ index: props.form.index })),
    {
      validateOn: ["input"],
    }
  );

  const keystoreFormHandler = useFormHandler(
    yupSchema(keystoreFormSchema({ index: props.form.index })),
    {
      validateOn: ["input"],
    }
  );

  const formHandler = () =>
    isKeystoreForm() ? keystoreFormHandler : phraseFormHandler;

  const submit = async (event: Event) => {
    event.preventDefault();

    await formHandler().validateForm();

    try {
      // Handle phrase form
      if (isPhraseForm() && !formHandler().isFormInvalid()) {
        setPhrase(formHandler().getFieldValue("phrase"), props.form.source);
      }

      // Handle keystore form
      if (
        isKeystoreForm() &&
        !formHandler().isFieldInvalid("password") &&
        !formHandler().isFieldInvalid("keystore")
      ) {
        const keystore = formHandler().getFieldValue("keystore");
        const password = formHandler().getFieldValue("password");
        const phrase = await decryptFromKeystore(
          // Form's keystore is a string, but needs to be passed as JSON
          JSON.parse(keystore),
          password
        );
        setPhrase(phrase, props.form.source);
      }
    } catch (error) {
      console.error("SUBMIT form error", error);
    }
  };

  const reset = () => {
    formHandler().resetForm();
    resetData();
  };

  const onChangePhrase = async ({ currentTarget: { name, value } }) => {
    await formHandler().setFieldValue(name, value);
  };

  const onChangePassword = async ({ currentTarget: { name, value } }) => {
    await formHandler().setFieldValue(name, value);
  };

  const onChangeIndex = async ({ currentTarget: { name, value } }) => {
    await formHandler().setFieldValue(name, value);
    if (!formHandler().isFieldInvalid("index")) {
      setIndex(parseInt(value));
    }
  };

  const onChangeSource = async ({ currentTarget: { value } }) => {
    await formHandler().resetForm();
    setSource(value as T.FormSource);
  };

  const onKeystoreFileSelected = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      try {
        const data = await file.text();
        // We store keyfile as string (not JSON)
        await formHandler().setFieldValue("keystore", data);
      } catch (error) {
        console.log("error:", error);
      }
    }
  };

  return (
    <form
      class={`card px-12 pb-12 text-lg mt-10  ${props.class || ""}`}
      onSubmit={submit}
    >
      {/* <p>form store {JSON.stringify(props.form)}</p>
      <p>formData {JSON.stringify(formHandler().formData())}</p> */}
      {/* source */}
      <div class="mt-6">
        <label for="mnemonic" class="inline-flex items-center">
          <input
            id="mnemonic"
            type="radio"
            class="form-radio"
            name="source"
            value="mnemonic"
            checked={props.form.source === "mnemonic"}
            onChange={onChangeSource}
          />
          <div class="flex items-center ml-2">
            Phrase
            <Show
              when={isPhraseForm() && !formHandler().isFieldInvalid("phrase")}
            >
              <CheckIcon class="ml-2 text-green-600" />
            </Show>
          </div>
        </label>
        <label for="keystore" class="inline-flex items-center ml-4">
          <input
            id="keystore"
            type="radio"
            class="form-radio"
            name="source"
            value="keystore"
            checked={props.form.source === "keystore"}
            onChange={onChangeSource}
          />
          <div class="flex items-center ml-2">
            Keystore{" "}
            <Show
              when={isKeystoreForm() && !formHandler().isFieldInvalid("keystore")}
            >
              <CheckIcon class="ml-2 text-green-600" />
            </Show>
          </div>
        </label>
      </div>
      <Switch>
        {/* phrase */}
        <Match when={isPhraseForm()}>
          <div class="flex flex-col w-full">
            <textarea
              data-testid="phrase"
              name="phrase"
              value={props.form.phrase}
              class="form-textarea mt-1 block w-full placeholder:text-gray-400 h-40"
              classList={{
                "border border-red-500 focus:border-red-500 focus:ring-red-500":
                  formHandler().fieldHasError("phrase"),
              }}
              placeholder="Enter your phrase (12 or 24 words) here..."
              oninput={onChangePhrase}
            />
          </div>
          <Show when={formHandler().isFieldInvalid("phrase")}>
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {formHandler().getFieldError("phrase")}
            </p>
          </Show>
        </Match>
        {/* keystore */}
        <Match when={isKeystoreForm()}>
          <div class="flex flex-col items-center justify-center h-40 w-full border rounded-sm border-gray-200 bg-gray-50">
            <label for="keystore-file" class="btn btn-outline text-sm bg-white">
              Select Keystore
              <input
                id="keystore-file"
                name="keystore-file"
                class="hidden"
                type="file"
                onchange={onKeystoreFileSelected}
              />
            </label>
            <label for="password" class="flex items-center mt-3">
              <input
                class="form-input"
                classList={{
                  "border border-red-500 focus:border-red-500 focus:ring-red-500":
                    formHandler().fieldHasError("password"),
                }}
                data-testid="password"
                id="password"
                type="password"
                name="password"
                value={formHandler().getFieldValue("password")}
                placeholder="Enter keystore password"
                oninput={onChangePassword}
              />
            </label>
          </div>
          <Show when={formHandler().isFieldInvalid("keystore")}>
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {formHandler().getFieldError("keystore")}
            </p>
          </Show>
          <Show when={formHandler().isFieldInvalid("password")}>
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {formHandler().getFieldError("password")}
            </p>
          </Show>
          {/* show phrase error only if keystore + password is already valid */}
          <Show
            when={
              formHandler().isFieldInvalid("phrase") &&
              !formHandler().isFieldInvalid("keystore") &&
              !formHandler().isFieldInvalid("password")
            }
          >
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {formHandler().getFieldError("phrase")}
            </p>
          </Show>
        </Match>
      </Switch>

      {/* network */}
      <div class="my-4 flex items-center">
        <legend class="mr-10">Network</legend>
        <label for="mainnet" class="inline-flex items-center">
          <input
            id="mainnet"
            type="radio"
            class="form-radio"
            name="network"
            value="mainnet"
            checked={props.form.network === "mainnet"}
            onChange={(e) => setNetwork(e.currentTarget.value as T.Network)}
          />
          <span class="ml-2">Mainnet</span>
        </label>
        <label for="stagenet" class="inline-flex items-center ml-6">
          <input
            id="stagenet"
            type="radio"
            class="form-radio"
            name="network"
            value="stagenet"
            checked={props.form.network === "stagenet"}
            onChange={(e) => setNetwork(e.currentTarget.value as T.Network)}
          />
          <span class="ml-2">Stagenet</span>
        </label>
      </div>

      {/* wallet index */}
      <div class="flex flex-col my-4">
        <label for="index" class="flex items-center">
          <span class="mr-3">Wallet Index</span>
          <input
            class="form-input w-[80px]"
            classList={{
              "border border-red-500 focus:border-red-500 focus:ring-red-500":
                formHandler().fieldHasError("index"),
            }}
            data-testid="index"
            id="index"
            type="number"
            min="0"
            name="index"
            value={props.form.index}
            oninput={onChangeIndex}
          />
        </label>
        <Show when={formHandler().isFieldInvalid("index")}>
          <p class="mt-2 text-sm text-red-600">
            {formHandler().getFieldError("index")}
          </p>
        </Show>
      </div>

      {/* form buttons */}
      <div class="flex items-center mt-12 ">
        <button
          class="btn text-xl flex items-center disabled:cursor-not-allowed"
          disabled={addressesLoading()}
          type="submit"
        >
          <Show when={addressesLoading()}>
            <LoaderIcon class="mr-2 text-white" />
          </Show>
          Derive addresses
        </button>

        <button
          class="ease btn btn-outline ml-5 text-xl"
          onClick={reset}
          type="button"
        >
          Reset all data
        </button>
      </div>
    </form>
  );
};

import { Component, Show, JSX } from "solid-js";

import { useFormHandler, yupSchema } from "solid-form-handler";
import {
  setPhrase,
  setNetwork,
  form,
  setIndex,
  INITIAL_FORM,
  resetData,
} from "../store";
import { phraseFormSchema } from "../util/validation";
import { Network } from "../types";

export type Props = {} & JSX.HTMLAttributes<HTMLElement>;

export const Form: Component<Props> = (props) => {
  const formHandler = useFormHandler(
    yupSchema(phraseFormSchema({ index: INITIAL_FORM.index })),
    {
      validateOn: ["input"],
    }
  );

  const { formData } = formHandler;

  const submit = async (event: Event) => {
    event.preventDefault();
    try {
      await formHandler.validateForm();
    } catch (error) {}
  };

  const reset = () => {
    formHandler.resetForm();
    resetData();
  };

  const onChangePhrase = async ({ currentTarget: { name, value } }) => {
    await formHandler.setFieldValue(name, value);
    if (!formHandler.isFieldInvalid("phrase")) {
      setPhrase(value);
    }
  };

  const onChangeIndex = async ({ currentTarget: { name, value } }) => {
    await formHandler.setFieldValue(name, value);
    if (!formHandler.isFieldInvalid("index")) {
      setIndex(parseInt(value));
    }
  };

  return (
    <form
      class={`card px-12 pb-12 text-lg mt-10  ${props.class || ""}`}
      onSubmit={submit}
    >
      <h1 class="2xl pt-4 pb-6">Source</h1>
      {/* phrase */}
      <label class="w-full ">
        <div class="flex items-center">
          Phrase
          <Show when={!formHandler.isFieldInvalid("phrase")}>
            <div class="ml-2 text-2xl text-green-600">✓</div>
          </Show>
        </div>
        <textarea
          data-testid="phrase"
          rows="3"
          name="phrase"
          value={form.phrase}
          // value={formHandler.getFieldValue("phrase")}
          class="form-textarea mt-1 block w-full placeholder:text-gray-400"
          classList={{
            "border border-red-500 focus:border-red-500 focus:ring-red-500":
              formHandler.fieldHasError("phrase"),
          }}
          placeholder="Enter your phrase (12 or 24 words) here..."
          oninput={onChangePhrase}
        />
      </label>

      <Show when={formHandler.isFieldInvalid("phrase")}>
        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
          {formHandler.getFieldError("phrase")}
        </p>
      </Show>

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
            checked={form.network === "mainnet"}
            onChange={(e) => setNetwork(e.currentTarget.value as Network)}
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
            checked={form.network === "stagenet"}
            onChange={(e) => setNetwork(e.currentTarget.value as Network)}
          />
          <span class="ml-2">Chaosnet</span>
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
                formHandler.fieldHasError("index"),
            }}
            data-testid="index"
            id="index"
            type="number"
            min="0"
            name="index"
            value={form.index}
            oninput={onChangeIndex}
          />
          <Show when={!formHandler.isFieldInvalid("index")}>
            <div class="ml-2 text-2xl text-green-600">✓</div>
          </Show>
        </label>
        <Show when={formHandler.isFieldInvalid("index")}>
          <p class="mt-2 text-sm text-red-600">
            {formHandler.getFieldError("index")}
          </p>
        </Show>
      </div>

      {/* form buttons */}

      <button
        class="ease btn btn-outline px-20 mt-5"
        onClick={reset}
        type="button"
      >
        Reset All Data
      </button>
    </form>
  );
};

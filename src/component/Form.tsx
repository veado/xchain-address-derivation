import { Component, Show, JSX } from "solid-js";

import { useFormHandler, yupSchema } from "solid-form-handler";
import {
  deriveAddresses,
  setPhrase,
  resetPhrase,
  setNetwork,
  form,
  setIndex,
  INITIAL_FORM,
} from "../store";
import { phraseFormSchema } from "../util";
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
      const phrase = formHandler.getFieldValue("phrase");
      console.log("submit:", phrase);
      setPhrase(phrase);
      deriveAddresses();
    } catch (error) {}
  };

  const reset = () => {
    formHandler.resetForm();
    resetPhrase();
  };

  const onChangePhrase = async ({ currentTarget: { name, value } }) => {
    await formHandler.setFieldValue(name, value);
    // if (!formHandler.isFieldInvalid("phrase")) {
    //   setPhrase(value);
    // }
  };

  const onChangeIndex = async ({ currentTarget: { name, value } }) => {
    await formHandler.setFieldValue(name, value);
    if (!formHandler.isFieldInvalid("index")) {
      setIndex(parseInt(value));
    }
  };

  return (
    <form
      class={`card p-12 text-lg mt-10  ${props.class || ""}`}
      onSubmit={submit}
    >
      {/* <p>FormData {JSON.stringify(formData())}</p> */}
      {/* <p>form store {JSON.stringify(form, null, 2)}</p>  */}

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
      <div class="my-8 flex items-center">
        <legend class="mr-10">Network:</legend>
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
      <div class="flex flex-col my-8">
        <label for="index" class="flex items-center">
          <span class="mr-3">Wallet Index:</span>
          <input
            class="form-input w-[80px]"
            classList={{
              "border border-red-500 focus:border-red-500 focus:ring-red-500":
                formHandler.fieldHasError("index"),
            }}
            data-testid="index"
            id="index"
            type="text"
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
      <div class="flex content-between items-center">
        <button
          class="ease btn disabled:opacity-20 disabled:cursor-not-allowed"
          disabled={formHandler.isFormInvalid()}
          type="submit"
        >
          <Show when={false}>
            <svg
              aria-hidden="true"
              role="status"
              class="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                class="fill-gray-100"
              />
            </svg>
          </Show>
          Derive addresses
        </button>
        <button class="ease btn btn-outline ml-2" onClick={reset} type="button">
          Reset data
        </button>
      </div>
    </form>
  );
};

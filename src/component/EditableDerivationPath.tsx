import { useFormHandler, yupSchema } from "solid-form-handler";
import { Component, JSX, createSignal, Show } from "solid-js";
import * as T from "../types";
import { derivationPathToString } from "../util/common";
import { editableDerivationPathSchema } from "../util/validation";
import { SettingsIcon } from "./icon/SettingsIcon";

export type Props = {
  path: T.DerivationPath;
  onChangePath: (path: T.DerivationPath) => void;
} & JSX.HTMLAttributes<HTMLElement>;

export const EditableDerivationPath: Component<Props> = (props) => {
  const pathString = derivationPathToString(props.path);

  const purpose = () => props.path[0];
  const coin = () => props.path[1];
  const account = () => props.path[2];
  const change = () => props.path[3];
  const index = () => props.path[4];

  const [editable, setEditable] = createSignal(false);

  const formHandler = useFormHandler(
    yupSchema(
      editableDerivationPathSchema({
        account: account(),
        change: change(),
        index: index(),
      })
    ),
    {
      validateOn: ["input"],
    }
  );

  const cancel = async (event: Event) => {
    event.preventDefault();

    formHandler.setFieldValue("account", account());
    formHandler.setFieldValue("change", change());
    formHandler.setFieldValue("index", index());
    setEditable(false);
  };

  const submit = async (event: Event) => {
    event.preventDefault();
    try {
      await formHandler.validateForm();

      const account = formHandler.getFieldValue("account");
      const change = formHandler.getFieldValue("change");
      const index = formHandler.getFieldValue("index");
      const path: T.DerivationPath = [
        purpose(),
        coin(),
        account,
        change,
        index,
      ];
      props.onChangePath(path);
      setEditable(false);
    } catch (error) {}
  };

  const onChangeInput = async ({ currentTarget: { name, value } }) => {
    await formHandler.setFieldValue(name, value);
  };

  return (
    <>
      <Show when={!editable()}>
        <div class={` ${props.class || ""}`}>
          <span
            class="group text-gray-400 hover:text-inherit inline-flex items-center cursor-pointer"
            onclick={() => setEditable(true)}
          >
            <p class="text-base m-0">{pathString}</p>
            <div class="ml-2">
              <SettingsIcon class="ease hover:rotate-90 group-hover:rotate-90" />
            </div>
          </span>
        </div>
      </Show>
      <Show when={editable()}>
        <form
          class="flex flex-col md:flex-row md:items-center text-base text-inherit m-0"
          onSubmit={submit}
        >
          <div class="flex items-center">
            <div class="">{`m/${purpose()}'/${coin()}'/`}</div>
            <input
              class="form-input w-[80px]"
              classList={{
                "border border-red-500 focus:border-red-500 focus:ring-red-500":
                  formHandler.fieldHasError("index"),
              }}
              data-testid="account"
              id="account"
              type="number"
              min="0"
              name="account"
              value={account()}
              oninput={onChangeInput}
            />
            /
            <input
              class="form-input w-[80px]"
              classList={{
                "border border-red-500 focus:border-red-500 focus:ring-red-500":
                  formHandler.fieldHasError("index"),
              }}
              data-testid="change"
              id="change"
              type="number"
              min="0"
              name="change"
              value={change()}
              oninput={onChangeInput}
            />
            /
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
              value={index()}
              oninput={onChangeInput}
            />
          </div>
          <div class="flex items-center md:ml-2 my-2 md:my-0">
            <button class="btn text-base md:text-xs" type="submit">
              Save
            </button>
            <button class="btn btn-outline text-base md:text-xs ml-2" onclick={cancel}>
              Cancel
            </button>
          </div>
        </form>
      </Show>
    </>
  );
};

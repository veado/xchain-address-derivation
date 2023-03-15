import { useFormHandler, yupSchema } from "solid-form-handler";
import { Component, JSX, createSignal, Show } from "solid-js";
import * as T from "../types";
import { derivationPathToString } from "../util/common";
import { editableDerivationPathSchema } from "../util/validation";

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
    <div class={`w-full flex items-center ${props.class || ""}`}>
      {/* <p>editable {editable().toString()}</p> */}
      <Show when={!editable()}>
        <p
          class="text-base text-gray-400 m-0 cursor-pointer"
          onclick={() => setEditable(true)}
        >
          {pathString}
        </p>
        <button class="btn ml-4 text-xs" onClick={() => setEditable(true)}>
          Edit
        </button>
      </Show>
      <Show when={editable()}>
        <form
          class="flex items-center text-base text-gray-400 m-0"
          onSubmit={submit}
        >
          <div class="t">{`m/${purpose()}'/${coin()}'/`}</div>
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
          <button class="btn text-xs" type="submit">
            Save
          </button>
          <button class="btn btn-outline text-xs ml-2" onclick={cancel}>
            Cancel
          </button>
        </form>
      </Show>
    </div>
  );
};

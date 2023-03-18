import { Component, Match, Switch, JSX } from "solid-js";
import { deriveAddressByChain } from "../store";
import * as T from "../types";
import { EditableDerivationPath } from "./EditableDerivationPath";

export type Props = {
  address: T.Address;
  path: T.DerivationPath;
} & JSX.HTMLAttributes<HTMLElement>;

export const Address: Component<Props> = (props) => {
  const { chain } = props.address;
  const resource = props.address.resource;

  const updatePath = (path: T.DerivationPath) => {
    deriveAddressByChain({ chain, path });
  };

  return (
    <div
      class={`w-full flex flex-col text-lg 
    [&:not(:last-child)]:border-b border-gray-200 [&:not(:last-child)]:mb-4 ${
      props.class || ""
    }`}
    >
      <h2 class="text-2xl m-0">{chain}</h2>
      <EditableDerivationPath path={props.path} onChangePath={updatePath} />
      <div>
        <div class="text-xl">
          <Switch>
            <Match when={resource.loading}>
              <p class="text-gray-300 italic">Deriving address...</p>
            </Match>
            <Match when={resource.error}>
              <p class="text-red-500">Address error ${resource.error()}</p>
            </Match>
            <Match when={resource()}>
              <p class="">{resource()}</p>
            </Match>
            <Match when={resource.state === "ready"}>
              <p class="text-gray-300">No address</p>
            </Match>
          </Switch>
        </div>
      </div>
    </div>
  );
};

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
    <div class={`w-full flex flex-col ${props.class || ""}`}>
      <h2 class="text-2xl m-0">{chain}</h2>
      <EditableDerivationPath path={props.path} onChangePath={updatePath} />
      <Switch>
        <Match when={resource.loading}>
          <p>Deriving address...</p>
        </Match>
        <Match when={resource.error}>
          <p>Address error ${resource.error()}</p>
        </Match>
        <Match when={resource()}>
          <p class="text-xl">{resource()}</p>
        </Match>
      </Switch>
    </div>
  );
};

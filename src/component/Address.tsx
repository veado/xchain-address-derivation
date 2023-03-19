import { Component, Match, Switch, JSX } from "solid-js";
import { deriveAddressByChain } from "../store";
import * as T from "../types";
import { chainToString, trimAddress } from "../util/common";
import { CopyButton } from "./CopyButton";
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
    [&:not(:last-child)]:border-b border-gray-200 [&:not(:last-child)]:mb-10 pb-4 ${
      props.class || ""
    }`}
    >
      <h2 class="text-2xl m-0">{chainToString(chain)}</h2>
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
              <p class="flex items-center">
                <span class='hidden md:inline-block'>{resource()}</span><span class='md:hidden'>{trimAddress(resource())}</span> <CopyButton class="ml-2 text-gray-400 hover:text-inherit ease" text={resource()} /></p>
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

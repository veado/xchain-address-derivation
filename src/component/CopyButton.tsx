import { Component, createSignal, JSX, Match, Switch } from "solid-js";
import { ClipboardCheckedIcon } from "./icon/ClipboardCheckedIcon";
import { ClipboardIcon } from "./icon/ClipboardIcon";

export type Props = {
  text: string;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const CopyButton: Component<Props> = (props) => {
  const [copied, setCopied] = createSignal(false);

  const copyHandler = () => {
    if (!copied()) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      navigator.clipboard.writeText(props.text);
    }
  };

  return (
    <div
      onClick={copyHandler}
      class={`${props.class || ""}`}
      classList={{
        "cursor-pointer": !copied(),
        "cursor-default": copied(),
      }}
    >
      <Switch>
        <Match when={copied()}>
          <ClipboardCheckedIcon />
        </Match>
        <Match when={!copied()}>
          <ClipboardIcon />
        </Match>
      </Switch>
    </div>
  );
};

import { Component, JSX } from "solid-js";
import { GithubIcon } from "./icon/GithubIcon";

export type Props = {} & JSX.HTMLAttributes<HTMLElement>;

const GH_URL = "https://github.com/veado/xchain-address-derivation";

export const Footer: Component<Props> = (props) => {
  return (
    <footer
      class={`w-full flex flex-col items-center justify-center py-2 ${
        props.class || ""
      }`}
    >
      <a
        class="ease h-7 w-7 rounded-full text-gray-400 hover:scale-110 hover:text-inherit"
        href={GH_URL}
      >
        <GithubIcon class="text-gray-400 hover:text-inherit w-6 h-6" />
      </a>

      <a
        class="text-gray-400 hover:text-inherit text-sm"
        href={`${GH_URL}/commit/${import.meta.env.VITE_COMMIT_HASH}`}
      >
        {import.meta.env.VITE_COMMIT_HASH}
      </a>
    </footer>
  );
};

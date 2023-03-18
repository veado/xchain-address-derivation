import { Component, JSX } from "solid-js";

export type Props = JSX.HTMLAttributes<SVGElement>;

export const CheckIcon: Component<Props> = (props) => (
  // `BsCheckLg`
  // https://solid-icons.vercel.app/search/bscheck
  <svg
    class={props.class}
    fill="currentColor"
    stroke-width="0"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    style="overflow: visible;"
    height="1em"
    width="1em"
  >
    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
  </svg>
);

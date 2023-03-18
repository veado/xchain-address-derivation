import { Component, JSX } from "solid-js";

export type Props = JSX.HTMLAttributes<SVGElement>;

export const SearchIcon: Component<Props> = (props) => (
  // `BsSearch` 
  // https://solid-icons.vercel.app/search/sort
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
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
  </svg>
);

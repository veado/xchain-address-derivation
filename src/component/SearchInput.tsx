import { JSX, Component, createSignal } from "solid-js";
import { CancelIcon } from "./icon/CancelIcon";

import { SearchIcon } from "./icon/SearchIcon";

export type Props = {
  disabled?: boolean;
  placeholder: string;
  onChangeSearch: (value: string) => void;
} & JSX.HTMLAttributes<SVGElement>;

export const SearchInput: Component<Props> = (props) => {
  const disabled = props.disabled || false;
  const [searchTxt, setSearchTxt] = createSignal("");

  const onChangeHandler = (event: Event) => {
    const value = (event.currentTarget as HTMLInputElement).value;
    setSearchTxt(value);
    props.onChangeSearch(searchTxt());
  };

  const onSearch = () => {
    props.onChangeSearch(searchTxt());
  };

  const onCancel = () => {
    setSearchTxt("");
    props.onChangeSearch("");
  };

  const onKeyDownHandler = ({ key }: KeyboardEvent) => {
    if (key === "Enter") {
      onSearch();
    }
    if (key === "Escape") {
      onCancel();
    }
  };

  return (
    <div class={`relative ${props.class}`}>
      <input
        type="text"
        placeholder={props.placeholder}
        class="peer w-full form-input px-10 py-1.5 "
        disabled={disabled}
        autocomplete="off"
        value={searchTxt()}
        onkeydown={onKeyDownHandler}
        oninput={onChangeHandler}
      />
      <SearchIcon
        class={`absolute left-2 top-[50%] h-5 w-5 translate-y-[-50%] text-gray-400 peer-focus:text-gray-500 ${
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        }`}
        onclick={onSearch}
      />
      <button
        type="button"
        class={`absolute right-2 top-[50%] h-5 w-5 translate-y-[-50%] text-gray-500 ${
          !searchTxt().length ? "hidden" : "block"
        }`}
        onclick={onCancel}
      >
        <CancelIcon class="h-4 w-4" />
      </button>
    </div>
  );
};

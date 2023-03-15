import { Component, JSX } from "solid-js";

type AlertType = "success" | "error" | "warning";

export type Props = {
  headline: string;
  description: string;
  type: AlertType;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const Alert: Component<Props> = (props) => {
  const { type, headline, description } = props;

  const color: Record<AlertType, string> = {
    success: "alert-green",
    error: "alert-red",
    warning: "alert-yellow",
  };

  return (
    <div
      class={`alert ${
        color[type]
      } p-0.5 flex items-center justify-center text-sm ${props.class || ""}`}
      role="alert"
    >
      <h6 class="font-bold uppercase m-1">{headline}</h6> {description}
    </div>
  );
};

import React from "react";
import clsx from "clsx";

type RadioButtonProps = {
  name: string;
  label: string;
  id: string;
  value: React.InputHTMLAttributes<HTMLInputElement>["value"];
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function RadioButton({
  label,
  className,
  id,
  ...rest
}: RadioButtonProps): JSX.Element {
  return (
    <div className={clsx("flex items-center", className)}>
      <input
        type="radio"
        id={id}
        className="h-4 w-4 border-gray-300 text-slate-900 focus:ring-slate-900"
        {...rest}
      />
      <label
        htmlFor={id}
        className="ml-3 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
    </div>
  );
}

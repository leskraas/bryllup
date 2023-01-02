import clsx from "clsx";
import type { ForwardedRef } from "react";
import React, { forwardRef } from "react";

type InputProps = {
  name: string;
  label: string;
  id: string;
  className?: string;
  classNameInput?: string;
  errorMessage?: string | null;
  description?: string;
} & React.InputHTMLAttributes<HTMLTextAreaElement>;

export const InputTexterea = forwardRef(function Input(
  {
    label,
    className,
    name,
    errorMessage,
    id,
    classNameInput,
    description,
    ...rest
  }: InputProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  const isCheckbox = rest.type === "checkbox";
  return (
    <div className={className}>
      <label htmlFor={id} className="text-md block font-medium text-slate-900">
        {label}
      </label>
      {description && <p className="text-sm text-slate-500">{description}</p>}
      <textarea
        type="text"
        name={name}
        id={id}
        ref={ref}
        aria-invalid={errorMessage ? true : undefined}
        aria-describedby={`${id}-error`}
        className={clsx(
          "sm:text-md mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
          {
            "mt-auto h-5 w-5": isCheckbox,
          },
          classNameInput
        )}
        {...rest}
      />

      {errorMessage && (
        <p
          id={`${id}-error`}
          className="mt-0.5  text-red-600 dark:text-red-500"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
});

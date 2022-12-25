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
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef(function Input(
  {
    label,
    className,
    name,
    errorMessage,
    id,
    classNameInput,
    ...rest
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-md block font-medium text-slate-900">
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={id}
        ref={ref}
        aria-invalid={errorMessage ? true : undefined}
        aria-describedby={`${id}-error`}
        className={clsx(
          "sm:text-md mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
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

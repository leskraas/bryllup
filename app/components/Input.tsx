import React from "react";

type InputProps = {
  name: string;
  label: string;
  id: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Input({
  label,
  className,
  name,
  id,
  ...rest
}: InputProps): JSX.Element {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-md block font-medium text-slate-900">
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={id}
        className="sm:text-md mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        {...rest}
      />
    </div>
  );
}

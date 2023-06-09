import { Dispatch, SetStateAction, ChangeEvent } from "react";

interface InputProps {
  id?: string;
  defaultValue?: string;
  name?: string;
  type?:
    | "text"
    | "search"
    | "password"
    | "email"
    | "checkbox"
    | "date"
    | "number";
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  autoComplete?: string;
  required?: boolean;
  handleOnChange?: Dispatch<SetStateAction<string>>;
  value?: string | number;
  autoFocus?: boolean;
}

export default function Input({
  id,
  name,
  type,
  placeholder,
  className,
  disabled,
  autoComplete,
  required,
  handleOnChange,
  value,
  autoFocus,
}: InputProps) {
  return (
    <input
      id={id}
      name={name}
      value={value}
      type={type}
      required={required}
      disabled={disabled}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      className={`${className} w-full mr-2 text-sm border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 checked:bg-pink-500 checked:hover:bg-pink-500 checked:focus:bg-pink-500`}
      placeholder={placeholder || "Digite aqui..."}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        handleOnChange(e.target.value)
      }
    />
  );
}

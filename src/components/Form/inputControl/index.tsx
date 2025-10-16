import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import type { Path } from "react-hook-form";

type InputControlProps<T extends FieldValues = FieldValues> = {
  control: Control<T>;
  name: Path<T>;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">;

function InputControl<T extends FieldValues = FieldValues>({
  name,
  control,
  ...rest
}: InputControlProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => <input {...field} {...rest} />}
    />
  );
}

export { InputControl };

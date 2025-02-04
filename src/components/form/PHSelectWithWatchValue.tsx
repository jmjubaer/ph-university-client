import { Form, Select } from "antd";
import { SetStateAction, useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type TSelectProps = {
    name: string;
    label?: string;
    disabled?: boolean;
    onValueChange?: SetStateAction<any>;
    mode?: "multiple" | undefined;
    options:
        | {
              value: string;
              label: string;
              disabled?: boolean;
          }[]
        | undefined;
};
const PHSelectWithWatchValue = ({
    label,
    name,
    options,
    disabled,
    mode,
    onValueChange,
}: TSelectProps) => {
    const { control } = useFormContext();
    const inputValue = useWatch({ control, name });
    useEffect(() => {
            onValueChange(inputValue);
    }, [inputValue, onValueChange]);
    return (
        <Controller
            name={name}
            render={({ field, fieldState: { error } }) => (
                <Form.Item label={label}>
                    <Select
                        mode={mode}
                        disabled={disabled}
                        {...field}
                        style={{ width: "100%" }}
                        //   onChange={handleChange}
                        options={options}
                    />
                    {error && (
                        <small style={{ color: "red" }}>{error.message}</small>
                    )}
                </Form.Item>
            )}
        />
    );
};

export default PHSelectWithWatchValue;

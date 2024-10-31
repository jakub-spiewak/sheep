import {Control, FieldPath, FieldValues, useController} from "react-hook-form"
import {NumberInputField, NumberInputRoot} from "@/components/ui/number-input.tsx";
import {Field, FieldProps} from "@/components/ui/field";
import {NumberInput as ChakraNumberInput} from "@chakra-ui/react"

interface NumerInputFieldProps<T extends FieldValues> {
    control: Control
    name: FieldPath<T>,
    inputRootProps?: ChakraNumberInput.RootProps
    fieldProps?: FieldProps
}

export const NumberInputControlledField = <T extends FieldValues>(props: NumerInputFieldProps<T>) => {
    const {control, name, inputRootProps = {}, fieldProps = {}} = props;
    const {field, fieldState} = useController({control, name})
    const error = fieldState.error
    return (
        <Field
            {...fieldProps}
            invalid={!!error}
            errorText={error?.message}
        >
            <NumberInputRoot
                {...inputRootProps}
                disabled={field.disabled}
                name={field.name}
                value={field.value}
                onValueChange={({valueAsNumber}) => {
                    field.onChange(valueAsNumber)
                }}
            >
                <NumberInputField
                    onBlur={field.onBlur}
                    pattern={'.*'}
                />
            </NumberInputRoot>
        </Field>
    )
}
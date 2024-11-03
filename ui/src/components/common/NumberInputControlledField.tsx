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
    const {field, fieldState} = useController({control, name, shouldUnregister: true})
    const error = fieldState.error

    const isPercent = inputRootProps.formatOptions?.style === 'percent'

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
                value={isPercent ? ((field.value ?? 0) * 100).toFixed(0) : field.value}
                onValueChange={({valueAsNumber}) => {
                    field.onChange(valueAsNumber);
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
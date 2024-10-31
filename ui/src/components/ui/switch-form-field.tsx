import {forwardRef, ReactElement, Ref} from "react"
import {Switch, SwitchProps} from "@/components/ui/switch.tsx";
import {Control, Controller, FieldValues, Path} from "react-hook-form";
import {Field} from "@/components/ui/field.tsx";

export interface SwitchFormFieldProps<TFieldValues extends FieldValues = FieldValues> extends SwitchProps {
    name: Path<TFieldValues>;
    control: Control<TFieldValues>;
}

const SwitchFormFieldRender = <TFieldValues extends FieldValues = FieldValues>(props: SwitchFormFieldProps<TFieldValues>, ref: Ref<HTMLInputElement> | undefined) => {
    const {name, control, ...rest} = props

    return (
        <Controller
            name={name}
            control={control}
            render={({field, fieldState}) => {
                return (
                    <Field
                        invalid={!!fieldState.error}
                        errorText={fieldState.error?.message}
                    >
                        <Switch
                            ref={ref}
                            name={field.name}
                            checked={field.value}
                            onCheckedChange={({checked}) => field.onChange(checked)}
                            inputProps={{onBlur: field.onBlur}}
                            {...rest}
                        />
                    </Field>
                )
            }}
        />
    )
};

export const SwitchFormField = forwardRef<HTMLInputElement, SwitchFormFieldProps>(SwitchFormFieldRender) as <T extends FieldValues>(p: SwitchFormFieldProps<T> & {
    ref?: Ref<HTMLInputElement>
}) => ReactElement

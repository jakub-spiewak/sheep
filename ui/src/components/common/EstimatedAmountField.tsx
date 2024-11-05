import {Fieldset, HStack} from "@chakra-ui/react";
import {Control, useController} from "react-hook-form";
import {EstimatedAmountTypeEnum} from "@/redux/generated/redux-api.ts";
import {Field} from "@/components/ui/field.tsx";
import {NumberInputControlledField} from "./NumberInputControlledField.tsx";
import {NativeSelectField, NativeSelectRoot} from "@/components/ui/native-select.tsx";
import {HasEstimatedAmount} from "@/util/types";
import {currency} from "@/util/commons.ts";
import {useEffect} from "react";


const estimatedAmountTypeOptions: { value: EstimatedAmountTypeEnum; label: string }[] = [
    {value: "RANGE", label: "Range"},
    {value: "VARIANCE_AMOUNT", label: "Variance Amount"},
    {value: "VARIANCE_PERCENT", label: "Variance Percent"},
    {value: "FIXED", label: "Fixed"},
];

interface EstimatedAmountFieldProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>;
}

const FixedAmountField = (props: EstimatedAmountFieldProps) => {
    const {control} = props;
    return (
        <NumberInputControlledField<HasEstimatedAmount>
            control={control}
            name="estimatedAmount.amount"
            fieldProps={{
                label: 'Fixed value',
                helperText: 'The amount is fixed and cannot be changed.',
            }}
            inputRootProps={{
                allowMouseWheel: true,
                defaultValue: '0.00',
                w: 'full',
                min: 0,
                formatOptions: {
                    style: "currency",
                    currency: currency,
                    currencyDisplay: "symbol",
                    currencySign: "accounting",
                },
            }}
        />
    );
};

const RangeAmountField = (props: EstimatedAmountFieldProps) => {
    const {control} = props;
    return (
        <>
            <NumberInputControlledField<HasEstimatedAmount>
                control={control}
                name="estimatedAmount.min"
                fieldProps={{
                    label: 'Minimum',
                    helperText: 'Optional. If not set, the minimum amount is 0.',
                }}
                inputRootProps={{
                    allowMouseWheel: true,
                    defaultValue: '0.00',
                    w: 'full',
                    min: 0,
                    formatOptions: {
                        style: "currency",
                        currency: currency,
                        currencyDisplay: "symbol",
                        currencySign: "accounting",
                    },
                }}
            />
            <NumberInputControlledField<HasEstimatedAmount>
                control={control}
                name="estimatedAmount.max"
                fieldProps={{
                    label: 'Maximum',
                    helperText: 'Optional. If not set, the maximum amount is 0.',
                }}
                inputRootProps={{
                    allowMouseWheel: true,
                    defaultValue: '0.00',
                    w: 'full',
                    min: 0,
                    formatOptions: {
                        style: "currency",
                        currency: currency,
                        currencyDisplay: "symbol",
                        currencySign: "accounting",
                    },
                }}
            />
        </>
    );
};

const VarianceAmountField = (props: EstimatedAmountFieldProps) => {
    const {control} = props;
    return (
        <>
            <NumberInputControlledField<HasEstimatedAmount>
                control={control}
                name="estimatedAmount.amount"
                fieldProps={{
                    label: 'Value',
                    helperText: 'The amount is calculated as the amount plus or minus this amount.',
                }}
                inputRootProps={{
                    allowMouseWheel: true,
                    defaultValue: '0.00',
                    w: 'full',
                    min: 0,
                    formatOptions: {
                        style: "currency",
                        currency: currency,
                        currencyDisplay: "symbol",
                        currencySign: "accounting",
                    },
                }}
            />
            <NumberInputControlledField<HasEstimatedAmount>
                control={control}
                name="estimatedAmount.variance"
                fieldProps={{
                    label: 'Variance',
                    helperText: 'The variance is calculated as the amount plus or minus this amount.',
                }}
                inputRootProps={{
                    allowMouseWheel: true,
                    defaultValue: '0.00',
                    w: 'full',
                    min: 0,
                    formatOptions: {
                        style: "currency",
                        currency: currency,
                        currencyDisplay: "symbol",
                        currencySign: "accounting",
                    },
                }}
            />
        </>
    );
};

const VariancePercentField = (props: EstimatedAmountFieldProps) => {
    const {control} = props;
    return (
        <>
            <NumberInputControlledField<HasEstimatedAmount>
                control={control}
                name="estimatedAmount.amount"
                fieldProps={{
                    label: 'Amount',
                    helperText: 'The amount is calculated as the amount multiplied by this percent.',
                }}
                inputRootProps={{
                    allowMouseWheel: true,
                    defaultValue: '0.00',
                    w: '100%',
                    min: 0,
                    formatOptions: {
                        style: "currency",
                        currency: currency,
                        currencyDisplay: "symbol",
                        currencySign: "accounting",
                    },
                }}
            />
            <NumberInputControlledField<HasEstimatedAmount>
                control={control}
                name="estimatedAmount.variancePercent"
                fieldProps={{
                    label: 'Variance Percent',
                    helperText: 'The variance is calculated as the amount multiplied by this percent.',
                }}
                inputRootProps={{
                    allowMouseWheel: true,
                    defaultValue: '0.00',
                    w: 'full',
                    min: 0,
                    max: 1,
                    step: 0.01,
                    formatOptions: {
                        style: 'percent',
                    },
                }}
            />
        </>
    );
};

interface FieldFactoryProps extends EstimatedAmountFieldProps {
    type?: EstimatedAmountTypeEnum
}

const FieldFactory = (props: FieldFactoryProps) => {
    const {type, control} = props;
    switch (type) {
        case "FIXED":
            return <FixedAmountField control={control}/>;
        case "RANGE":
            return <RangeAmountField control={control}/>;
        case "VARIANCE_AMOUNT":
            return <VarianceAmountField control={control}/>;
        case "VARIANCE_PERCENT":
            return <VariancePercentField control={control}/>;
        default:
            return null;
    }
};

export const EstimatedAmountField = (props: EstimatedAmountFieldProps) => {
    const {control} = props;

    const {field: typeField} = useController({control, name: 'estimatedAmount.type'})
    const type = typeField.value

    // Robust solution that just works
    useEffect(() => {
        switch (type) {
            case "FIXED":
                delete control._formValues.estimatedAmount.min
                delete control._formValues.estimatedAmount.max
                delete control._formValues.estimatedAmount.variance
                delete control._formValues.estimatedAmount.variancePercent
                if (!control._formValues.estimatedAmount.amount) {
                    control._formValues.estimatedAmount.amount = 0
                }
                break;
            case "RANGE":
                delete control._formValues.estimatedAmount.amount
                delete control._formValues.estimatedAmount.variance
                delete control._formValues.estimatedAmount.variancePercent
                if (!control._formValues.estimatedAmount.min) {
                    control._formValues.estimatedAmount.min = 0;
                }
                if (!control._formValues.estimatedAmount.max) {
                    control._formValues.estimatedAmount.max = 0;
                }
                break;
            case "VARIANCE_AMOUNT":
                delete control._formValues.estimatedAmount.min
                delete control._formValues.estimatedAmount.max
                delete control._formValues.estimatedAmount.variancePercent
                if (!control._formValues.estimatedAmount.amount) {
                    control._formValues.estimatedAmount.amount = 0;
                }
                if (!control._formValues.estimatedAmount.variance) {
                    control._formValues.estimatedAmount.variance = 0;
                }
                break;
            case "VARIANCE_PERCENT":
                delete control._formValues.estimatedAmount.min
                delete control._formValues.estimatedAmount.max
                delete control._formValues.estimatedAmount.variance
                if (!control._formValues.estimatedAmount.amount) {
                    control._formValues.estimatedAmount.amount = 0;
                }
                if (!control._formValues.estimatedAmount.variancePercent) {
                    control._formValues.estimatedAmount.variancePercent = 0;
                }
                break;
        }
    }, [control._formValues.estimatedAmount, type])

    return (
        <Fieldset.Root>
            <Fieldset.Legend>Estimated amount</Fieldset.Legend>
            <HStack alignItems={'flex-start'} gap={2}>
                <Field
                    label={'Type'}
                    helperText={'How the amount is estimated'}
                    w={'50%'}
                >
                    <NativeSelectRoot>
                        <NativeSelectField
                            {...typeField}
                            items={estimatedAmountTypeOptions}
                        />
                    </NativeSelectRoot>
                </Field>
                <FieldFactory
                    type={type}
                    control={control}
                />
            </HStack>
        </Fieldset.Root>
    );
};

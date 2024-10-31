import {
    DialogActionTrigger,
    DialogBackdrop,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button.tsx";
import {Field} from "@/components/ui/field.tsx";
import {HStack, Input, Stack,} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {isNullOrEmpty} from "@/util/functions.ts";
import {ExpenseBlueprintCreateRequest, FrequencyEnum} from "@/redux/generated/redux-api.ts";
import {NativeSelectField, NativeSelectRoot} from "@/components/ui/native-select.tsx";
import {EstimatedAmountField} from "@/components/common/EstimatedAmountField.tsx";

const frequencyOptions: { value: FrequencyEnum, label: string }[] = [
    {
        value: "DAILY",
        label: "Daily"
    },
    {
        value: "WEEKLY",
        label: "Weekly"
    },
    {
        value: "MONTHLY",
        label: "Monthly"
    },
    {
        value: "YEARLY",
        label: "Yearly"
    }
]

export const NewExpenseBlueprintDialog = () => {

    const {
        register,
        watch,
        control,
        // setValue,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<ExpenseBlueprintCreateRequest>({
        // resolver: zodResolver(newDataSchemaSchema),
        defaultValues: {
            name: '',
            frequency: 'MONTHLY',
            startDate: new Date().toISOString(),
            endDate: undefined,
            tags: [],
            // estimatedAmount: {
            //     type: 'VARIANCE_PERCENT',
            //     amount: 0.0,
            //     variancePercent: 0.6
            // }
            estimatedAmount: {
                type: 'FIXED',
                amount: 4.0,
                // variancePercent: 0.6
            }
        }
    })

    const onSubmit = (data: ExpenseBlueprintCreateRequest) => {
        console.log(data)
        reset({
            name: 'cycek',
            tags: [],
            estimatedAmount: {
                type: 'RANGE',
                min: 69,
                max: 420
            },
            frequency: 'YEARLY',
        })
    }

    console.log('all', watch('estimatedAmount'))

    return (
        <DialogRoot
            scrollBehavior={'inside'}
            size={'lg'}
            onOpenChange={(e) => {
                if (!e.open) {
                    reset()
                }
            }}>
            <DialogBackdrop/>
            <DialogTrigger asChild>
                <Button>
                    Create expense blueprint
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogCloseTrigger/>
                <DialogHeader>
                    <DialogTitle>Create expense blueprint</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <form id={"main_form"} onSubmit={handleSubmit(onSubmit)}>
                        <Stack gap={4}>
                            <Field
                                label={'Name'}
                                helperText={'Name of the expense'}
                                invalid={!!errors.name}
                                errorText={errors.name?.message}
                            >
                                <Input
                                    placeholder={'Name'}
                                    {...register('name')}
                                />
                            </Field>
                            <EstimatedAmountField control={control}/>
                            <Field
                                label={'Frequency'}
                                helperText={'How often the expense is expected to occur'}
                            >
                                <NativeSelectRoot>
                                    <NativeSelectField {...register("frequency")} items={frequencyOptions}/>
                                </NativeSelectRoot>
                            </Field>
                            <HStack>
                                <Field
                                    label={'Start date'}
                                    helperText={'When the expense is expected to start'}
                                >
                                    <Input
                                        {...register("startDate")}
                                        type={"date"}
                                    />
                                </Field>
                                <Field
                                    label={'End date'}
                                    helperText={'When the expense is expected to end'}
                                >
                                    <Input
                                        {...register("endDate")}
                                        type={"date"}
                                    />
                                </Field>
                            </HStack>

                        </Stack>
                    </form>
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogActionTrigger>
                    <Button
                        type={"submit"}
                        form={"main_form"}
                        disabled={!isNullOrEmpty(errors)}
                    >
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    )
}

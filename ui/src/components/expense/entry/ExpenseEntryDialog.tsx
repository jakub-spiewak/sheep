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
} from "@/components/ui/dialog.tsx"
import {Button} from "@/components/ui/button.tsx";
import {Field} from "@/components/ui/field.tsx";
import {Input, Stack,} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {isNullOrEmpty} from "@/util/functions.ts";
import {
    ExpenseEntryCreateRequest,
    ExpenseEntryUpdateRequest,
    useCreateExpenseEntryMutation,
    useGetExpenseScheduleByIdQuery,
    useGetExpenseSchedulesQuery,
    useUpdateExpenseEntryMutation,
} from "@/redux/generated/redux-api.ts";
import {useEffect, useState} from "react";
import {TagField} from "@/components/common/TagField.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {newExpenseEntrySchema} from "@/util/validation.schemas.ts";
import {NumberInputControlledField} from "@/components/common/NumberInputControlledField";
import {currency} from "@/util/commons.ts";
import {NativeSelectField, NativeSelectRoot} from "@/components/ui/native-select.tsx";

const defaultValues: ExpenseEntryCreateRequest = {
    name: "",
    date: "MONTHLY",
    tags: [],
    amount: 0.00,
    blueprintId: null,
};

interface ExpenseEntryDialogProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    valueToUpdate?: ExpenseEntryUpdateRequest & { id: string };
}

export const ExpenseEntryDialog = (props: ExpenseEntryDialogProps) => {
    const {open, setOpen, valueToUpdate} = props

    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        formState: {errors, isDirty},
        reset,
    } = useForm<ExpenseEntryCreateRequest>({
        resolver: zodResolver(newExpenseEntrySchema),
        resetOptions: {
            keepDirtyValues: false
        },
        defaultValues
    });

    const scheduleId = watch('blueprintId')

    const [createExpenseEntry, createExpenseEntryResult] = useCreateExpenseEntryMutation()
    const [updateExpenseEntry, updateExpenseEntryResult] = useUpdateExpenseEntryMutation()
    const {data: schedules = []} = useGetExpenseSchedulesQuery()
    const {data: selectedExpenseSchedule} = useGetExpenseScheduleByIdQuery({blueprintId: scheduleId!}, {skip: !scheduleId})

    const [scheduleIds, setScheduleIds] = useState<{ value: string, label: string }[]>([])

    useEffect(() => {
        const {isSuccess, reset} = createExpenseEntryResult
        if (isSuccess) {
            setOpen(false);
            reset()
        }
    }, [createExpenseEntryResult, setOpen]);

    useEffect(() => {
        const {isSuccess, reset} = updateExpenseEntryResult
        if (isSuccess) {
            setOpen(false);
            reset()
        }
    }, [updateExpenseEntryResult, setOpen]);


    useEffect(() => {
        if (valueToUpdate) {
            reset(valueToUpdate);
        }
    }, [valueToUpdate, reset]);

    useEffect(() => {
        if (!open) {
            reset(defaultValues);
        }
    }, [open, reset]);

    useEffect(() => {
        setScheduleIds(
            [...schedules.map(schedule => ({
                value: schedule.id,
                label: schedule.name
            })), {
                value: "",
                label: "None"
            }])
    }, [schedules]);

    useEffect(() => {
        if (scheduleId && selectedExpenseSchedule) {
            setValue('tags', selectedExpenseSchedule.tags)
        } else {
            setValue('tags', [])
        }

        if (!isDirty) {
            return;
        }

        switch (selectedExpenseSchedule?.estimatedAmount.type) {
            case "FIXED":
                setValue('amount', selectedExpenseSchedule.estimatedAmount.amount);
                break;
            case "VARIANCE_AMOUNT":
                setValue('amount', selectedExpenseSchedule.estimatedAmount.amount)
                break;
            case "VARIANCE_PERCENT":
                setValue('amount', selectedExpenseSchedule.estimatedAmount.amount)
                break;
            case "RANGE":
                setValue('amount', (selectedExpenseSchedule.estimatedAmount.min + selectedExpenseSchedule.estimatedAmount.max) / 2);
                break;
            default:
                setValue('amount', valueToUpdate?.amount ?? 0.00);
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scheduleId, selectedExpenseSchedule, setValue, valueToUpdate]);

    const onSubmit = (data: ExpenseEntryCreateRequest) => {
        if (data.blueprintId === '') {
            delete data.blueprintId
        }
        if (valueToUpdate?.id) {
            updateExpenseEntry({expenseEntryUpdateRequest: data, entryId: valueToUpdate.id})
        } else {
            createExpenseEntry({expenseEntryCreateRequest: data})
        }
    }

    return (
        <DialogRoot
            scrollBehavior={"inside"}
            size={"lg"}
            open={open}
            onOpenChange={(e) => {
                if (!e.open) {
                    reset()
                }
                setOpen(e.open)
            }}
        >
            <DialogBackdrop/>
            <DialogTrigger asChild>
                <Button>
                    Create expense entry
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogCloseTrigger/>
                <DialogHeader>
                    <DialogTitle>Create expense entry</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <form id={"main_form"} onSubmit={handleSubmit(onSubmit)}>
                        <Stack gap={4}>
                            <Field
                                label={"Name"}
                                helperText={"Name of the expense"}
                                invalid={!!errors.name}
                                errorText={errors.name?.message}
                            >
                                <Input
                                    placeholder={"Name"}
                                    {...register("name")}
                                />
                            </Field>
                            <NumberInputControlledField<ExpenseEntryCreateRequest>
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-expect-error
                                control={control}
                                name="amount"
                                fieldProps={{
                                    label: 'Amount',
                                    helperText: 'Amount of the expense',
                                }}
                                inputRootProps={{
                                    allowMouseWheel: true,
                                    defaultValue: '0.00',
                                    w: '100%',
                                    min: 0,
                                    formatOptions: {
                                        style: "currency",
                                        currency,
                                        currencyDisplay: "symbol",
                                        currencySign: "accounting",
                                    },
                                }}
                            />
                            <Field
                                label={'Schedule'}
                                helperText={'Schedule of the expense. Maybe none.'}
                            >
                                <NativeSelectRoot>
                                    <NativeSelectField
                                        {...register('blueprintId')}
                                        items={scheduleIds}
                                    />
                                </NativeSelectRoot>
                            </Field>
                            <Field
                                label={"Date"}
                                helperText={"Date on which the expense occurred"}
                                invalid={!!errors.date}
                                errorText={errors.date?.message}
                            >
                                <Input
                                    {...register("date")}
                                    type={"date"}
                                />
                            </Field>
                            <TagField
                                tags={watch("tags")}
                                onChange={(tags) => setValue("tags", tags)}
                            />
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
                        loading={createExpenseEntryResult.isLoading || updateExpenseEntryResult.isLoading}
                    >
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    )
}

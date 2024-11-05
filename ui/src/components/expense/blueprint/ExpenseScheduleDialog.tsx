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
import {HStack, Input, Stack,} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {isNullOrEmpty} from "@/util/functions.ts";
import {
    ExpenseScheduleCreateRequest,
    ExpenseScheduleUpdateRequest,
    FrequencyEnum,
    useCreateExpenseScheduleMutation,
    useUpdateExpenseScheduleMutation,
} from "@/redux/generated/redux-api.ts";
import {NativeSelectField, NativeSelectRoot} from "@/components/ui/native-select.tsx";
import {EstimatedAmountField} from "@/components/common/EstimatedAmountField.tsx";
import {useEffect} from "react";
import {TagField} from "@/components/common/TagField.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {newExpenseScheduleSchema} from "@/util/validation.schemas.ts";

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

const defaultValues: ExpenseScheduleCreateRequest = {
    name: "",
    frequency: "MONTHLY",
    startDate: "",
    endDate: undefined,
    tags: [],
    estimatedAmount: {
        type: "FIXED",
        amount: 0.0,
    }
};

interface ExpenseScheduleDialogProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    valueToUpdate?: ExpenseScheduleUpdateRequest & { id: string };
}

export const ExpenseScheduleDialog = (props: ExpenseScheduleDialogProps) => {
    const {open, setOpen, valueToUpdate} = props

    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        formState: {errors},
        reset,
    } = useForm<ExpenseScheduleCreateRequest>({
        resolver: zodResolver(newExpenseScheduleSchema),
        resetOptions: {
            keepDirtyValues: false
        },
        defaultValues
    });

    const [createExpenseSchedule, createExpenseScheduleResult] = useCreateExpenseScheduleMutation()
    const [updateExpenseSchedule, updateExpenseScheduleResult] = useUpdateExpenseScheduleMutation()

    useEffect(() => {
        const {isSuccess, reset} = createExpenseScheduleResult
        if (isSuccess) {
            setOpen(false);
            reset()
        }
    }, [createExpenseScheduleResult, setOpen]);

    useEffect(() => {
        const {isSuccess, reset} = updateExpenseScheduleResult
        if (isSuccess) {
            setOpen(false);
            reset()
        }
    }, [updateExpenseScheduleResult, setOpen]);


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

    const onSubmit = (data: ExpenseScheduleCreateRequest) => {
        if (valueToUpdate) {
            updateExpenseSchedule({expenseScheduleUpdateRequest: data, blueprintId: valueToUpdate.id})
        } else {
            createExpenseSchedule({expenseScheduleCreateRequest: data})
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
                            {<EstimatedAmountField control={control}/>}
                            <Field
                                label={"Frequency"}
                                helperText={"How often the expense is expected to occur"}
                            >
                                <NativeSelectRoot>
                                    <NativeSelectField {...register("frequency")} items={frequencyOptions}/>
                                </NativeSelectRoot>
                            </Field>
                            <HStack alignItems={"flex-start"}>
                                <Field
                                    label={"Start date"}
                                    helperText={"When the expense is expected to start"}
                                    invalid={!!errors.startDate}
                                    errorText={errors.startDate?.message}
                                >
                                    <Input
                                        {...register("startDate")}
                                        type={"date"}
                                    />
                                </Field>
                                <Field
                                    label={"End date"}
                                    helperText={"When the expense is expected to end"}
                                    invalid={!!errors.endDate}
                                    errorText={errors.endDate?.message}
                                >
                                    <Input
                                        {...register("endDate")}
                                        type={"date"}
                                    />
                                </Field>
                            </HStack>
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
                        loading={createExpenseScheduleResult.isLoading || updateExpenseScheduleResult.isLoading}
                    >
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    )
}

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
import {
    ExpenseBlueprintCreateRequest,
    ExpenseBlueprintUpdateRequest,
    FrequencyEnum,
    useCreateExpenseBlueprintMutation,
    useUpdateExpenseBlueprintMutation
} from "@/redux/generated/redux-api.ts";
import {NativeSelectField, NativeSelectRoot} from "@/components/ui/native-select.tsx";
import {EstimatedAmountField} from "@/components/common/EstimatedAmountField.tsx";
import {useEffect} from "react";

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

const defaultValues: ExpenseBlueprintCreateRequest = {
    name: '',
    frequency: 'MONTHLY',
    startDate: new Date().toISOString(),
    endDate: undefined,
    tags: [],
    estimatedAmount: {
        type: 'FIXED',
        amount: 0.0,
    }
};

interface ExpenseBlueprintDialogProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    valueToUpdate?: ExpenseBlueprintUpdateRequest & { id: string };
}

// TODO: zod validation
export const ExpenseBlueprintDialog = (props: ExpenseBlueprintDialogProps) => {
    const {open, setOpen, valueToUpdate} = props
    const {
        register,
        control,
        handleSubmit,
        watch,
        formState: {errors},
        reset,
    } = useForm<ExpenseBlueprintCreateRequest>({
        // resolver: zodResolver(newDataSchemaSchema),
        resetOptions: {
            keepDirtyValues: false
        },
        defaultValues
    });
    console.log(watch())

    const [createExpenseBlueprint, createExpenseBlueprintResult] = useCreateExpenseBlueprintMutation()
    const [updateExpenseBlueprint, updateExpenseBlueprintResult] = useUpdateExpenseBlueprintMutation()

    useEffect(() => {
        const {isSuccess, reset} = createExpenseBlueprintResult
        if (isSuccess) {
            setOpen(false);
            reset()
        }
    }, [createExpenseBlueprintResult, setOpen]);

    useEffect(() => {
        const {isSuccess, reset} = updateExpenseBlueprintResult
        if (isSuccess) {
            setOpen(false);
            reset()
        }
    }, [updateExpenseBlueprintResult, setOpen]);


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

    const onSubmit = (data: ExpenseBlueprintCreateRequest) => {
        if (valueToUpdate) {
            updateExpenseBlueprint({expenseBlueprintUpdateRequest: data, blueprintId: valueToUpdate.id})
        } else {
            createExpenseBlueprint({expenseBlueprintCreateRequest: data})
        }
    }

    return (
        <DialogRoot
            scrollBehavior={'inside'}
            size={'lg'}
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
                            {open && <EstimatedAmountField control={control}/>}
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
                        loading={createExpenseBlueprintResult.isLoading}
                    >
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    )
}

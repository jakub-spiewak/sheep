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
    EstimatedAmount,
    ExpenseBlueprintCreateRequest,
    ExpenseBlueprintUpdateRequest,
    FixedAmount,
    FrequencyEnum,
    RangeAmount,
    useCreateExpenseBlueprintMutation,
    useUpdateExpenseBlueprintMutation,
    VarianceAmount,
    VariancePercent
} from "@/redux/generated/redux-api.ts";
import {NativeSelectField, NativeSelectRoot} from "@/components/ui/native-select.tsx";
import {EstimatedAmountField} from "@/components/common/EstimatedAmountField.tsx";
import {useEffect} from "react";
import {TagField} from "@/components/common/TagField.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {z, ZodType} from "zod";

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

    const fixedAmountSchema = z.object({
        type: z.literal("FIXED"),
        amount: z.number().min(0.01, "Amount must be greater than 0")
    }) satisfies ZodType<FixedAmount>;
    const rangeAmountSchema = z.object({
        type: z.literal("RANGE"),
        min: z.number(),
        max: z.number().min(0.01, "Max amount must be greater than 0"),
    }) satisfies ZodType<RangeAmount>
    const variancePercentSchema = z.object({
        type: z.literal("VARIANCE_PERCENT"),
        amount: z.number().min(0.01, "Amount must be greater than 0"),
        variancePercent: z.number().min(0.01, "Variance percent must be greater than 0").max(100, "Variance percent must be less than 100")
    }) satisfies ZodType<VariancePercent>;
    const varianceAmountSchema = z.object({
        type: z.literal("VARIANCE_AMOUNT"),
        amount: z.number().min(0.01, "Amount must be greater than 0"),
        variance: z.number().min(0.01, "Variance must be greater than 0")
    }) satisfies ZodType<VarianceAmount>;

    const estimatedAmountSchema = z.discriminatedUnion("type", [
        fixedAmountSchema,
        rangeAmountSchema,
        variancePercentSchema,
        varianceAmountSchema,
    ])
        .refine(data => {
            if (!data.type || data.type !== "VARIANCE_AMOUNT") {
                return true;
            }
            return data.variance < data.amount;
        }, {
            message: "Variance must be smaller than amount",
            path: ["variance"]
        })
        .refine(data => {
            if (!data.type || data.type !== "RANGE") {
                return true;
            }
            return data.max > data.min;
        }, {
            message: "Max amount must be greater than min amount",
            path: ["max"]
        })
        .refine(data => {
            if (!data.type || data.type !== "RANGE") {
                return true;
            }
            return data.max !== data.min;
        }, {
            message: "Max amount must be different from min amount",
            path: ["max", "min"]
        }) satisfies ZodType<EstimatedAmount>;

    const newDataSchemaSchema = z.object({
        name: z.string().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
        frequency: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]),
        startDate: z.string().min(1, {message: "Start date is required"}),
        endDate: z.string().optional(),
        estimatedAmount: estimatedAmountSchema,
        tags: z.array(z.string()),
    })
        .refine(data => {
                if (!data.endDate || !data.startDate) {
                    return true;
                }
                const startDate = new Date(data.startDate).getTime();
                const endDate = new Date(data.endDate).getTime();
                return startDate !== endDate
            }, {
                message: "Start date and end date must be different",
                path: ["endDate"]
            }
        )
        .refine(data => {
            if (!data.endDate || !data.startDate) {
                return true;
            }
            const startDate = new Date(data.startDate).getTime();
            const endDate = new Date(data.endDate).getTime();
            return startDate < endDate
        }, {
            message: "End date must be after start date",
            path: ["endDate"]
        }) satisfies ZodType<ExpenseBlueprintCreateRequest>

    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        formState: {errors},
        reset,
    } = useForm<ExpenseBlueprintCreateRequest>({
        resolver: zodResolver(newDataSchemaSchema),
        resetOptions: {
            keepDirtyValues: false
        },
        defaultValues
    });

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
                            <HStack alignItems={"flex-start"}>
                                <Field
                                    label={'Start date'}
                                    helperText={'When the expense is expected to start'}
                                    invalid={!!errors.startDate}
                                    errorText={errors.startDate?.message}
                                >
                                    <Input
                                        {...register("startDate")}
                                        type={"date"}
                                    />
                                </Field>
                                <Field
                                    label={'End date'}
                                    helperText={'When the expense is expected to end'}
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
                                tags={watch('tags')}
                                onChange={(tags) => setValue('tags', tags)}
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
                        loading={createExpenseBlueprintResult.isLoading || updateExpenseBlueprintResult.isLoading}
                    >
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    )
}

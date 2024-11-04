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
    FixedAmount,
    FrequencyEnum,
    IncomeBlueprintCreateRequest,
    IncomeBlueprintUpdateRequest,
    RangeAmount,
    useCreateIncomeBlueprintMutation,
    useUpdateIncomeBlueprintMutation,
    VarianceAmount,
    VariancePercent
} from "@/redux/generated/redux-api.ts";
import {NativeSelectField, NativeSelectRoot} from "@/components/ui/native-select.tsx";
import {EstimatedAmountField} from "@/components/common/EstimatedAmountField.tsx";
import {useEffect} from "react";
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

const defaultValues: IncomeBlueprintCreateRequest = {
    name: "",
    frequency: "MONTHLY",
    startDate: "",
    endDate: undefined,
    estimatedAmount: {
        type: "FIXED",
        amount: 0.0,
    }
};

interface IncomeBlueprintDialogProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    valueToUpdate?: IncomeBlueprintUpdateRequest & { id: string };
}

export const IncomeBlueprintDialog = (props: IncomeBlueprintDialogProps) => {
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
        endDate: z.string().nullable().optional(),
        estimatedAmount: estimatedAmountSchema,
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
        }) satisfies ZodType<IncomeBlueprintCreateRequest>

    const {
        register,
        control,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<IncomeBlueprintCreateRequest>({
        resolver: zodResolver(newDataSchemaSchema),
        resetOptions: {
            keepDirtyValues: false
        },
        defaultValues
    });

    const [createIncomeBlueprint, createIncomeBlueprintResult] = useCreateIncomeBlueprintMutation()
    const [updateIncomeBlueprint, updateIncomeBlueprintResult] = useUpdateIncomeBlueprintMutation()

    useEffect(() => {
        const {isSuccess, reset} = createIncomeBlueprintResult
        if (isSuccess) {
            setOpen(false);
            reset()
        }
    }, [createIncomeBlueprintResult, setOpen]);

    useEffect(() => {
        const {isSuccess, reset} = updateIncomeBlueprintResult
        if (isSuccess) {
            setOpen(false);
            reset()
        }
    }, [updateIncomeBlueprintResult, setOpen]);


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

    const onSubmit = (data: IncomeBlueprintCreateRequest) => {
        if (valueToUpdate) {
            updateIncomeBlueprint({incomeBlueprintUpdateRequest: data, blueprintId: valueToUpdate.id})
        } else {
            createIncomeBlueprint({incomeBlueprintCreateRequest: data})
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
                    Create income blueprint
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogCloseTrigger/>
                <DialogHeader>
                    <DialogTitle>Create income blueprint</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <form id={"main_form"} onSubmit={handleSubmit(onSubmit)}>
                        <Stack gap={4}>
                            <Field
                                label={"Name"}
                                helperText={"Name of the income"}
                                invalid={!!errors.name}
                                errorText={errors.name?.message}
                            >
                                <Input
                                    placeholder={"Name"}
                                    {...register("name")}
                                />
                            </Field>
                            {open && <EstimatedAmountField control={control}/>}
                            <Field
                                label={"Frequency"}
                                helperText={"How often the income is expected to occur"}
                            >
                                <NativeSelectRoot>
                                    <NativeSelectField {...register("frequency")} items={frequencyOptions}/>
                                </NativeSelectRoot>
                            </Field>
                            <HStack alignItems={"flex-start"}>
                                <Field
                                    label={"Start date"}
                                    helperText={"When the income is expected to start"}
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
                                    helperText={"When the income is expected to end"}
                                    invalid={!!errors.endDate}
                                    errorText={errors.endDate?.message}
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
                        loading={createIncomeBlueprintResult.isLoading || updateIncomeBlueprintResult.isLoading}
                    >
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    )
}

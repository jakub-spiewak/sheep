import {z, ZodType} from "zod";
import {
    EstimatedAmount, ExpenseScheduleCreateRequest,
    FixedAmount, IncomeBlueprintCreateRequest,
    RangeAmount,
    VarianceAmount,
    VariancePercent
} from "@/redux/generated/redux-api.ts";

export const fixedAmountSchema = z.object({
    type: z.literal("FIXED"),
    amount: z.number().min(0.01, "Amount must be greater than 0")
}) satisfies ZodType<FixedAmount>;
export const rangeAmountSchema = z.object({
    type: z.literal("RANGE"),
    min: z.number(),
    max: z.number().min(0.01, "Max amount must be greater than 0"),
}) satisfies ZodType<RangeAmount>
export const variancePercentSchema = z.object({
    type: z.literal("VARIANCE_PERCENT"),
    amount: z.number().min(0.01, "Amount must be greater than 0"),
    variancePercent: z.number().min(0.01, "Variance percent must be greater than 0").max(100, "Variance percent must be less than 100")
}) satisfies ZodType<VariancePercent>;
export const varianceAmountSchema = z.object({
    type: z.literal("VARIANCE_AMOUNT"),
    amount: z.number().min(0.01, "Amount must be greater than 0"),
    variance: z.number().min(0.01, "Variance must be greater than 0")
}) satisfies ZodType<VarianceAmount>;


export const estimatedAmountSchema = z.discriminatedUnion("type", [
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


export const newExpenseScheduleSchema = z.object({
    name: z.string().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
    frequency: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]),
    startDate: z.string().nullable(),
    endDate: z.string().nullable(),
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
    }) satisfies ZodType<ExpenseScheduleCreateRequest>

export const newIncomeBlueprintSchema = z.object({
    name: z.string().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
    frequency: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]),
    startDate: z.string().nullable().optional(),
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


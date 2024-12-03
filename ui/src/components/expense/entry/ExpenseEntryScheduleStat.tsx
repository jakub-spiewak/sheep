import {StatLabel, StatRoot, StatTrend, StatValueText} from "@/components/ui/stat.tsx";
import {FormatNumber, HStack, Spinner} from "@chakra-ui/react";
import {currency} from "@/util/commons.ts";
import {ProgressBar, ProgressRoot} from "@/components/ui/progress.tsx";
import {
    EstimatedAmount,
    ExpenseScheduleResponse,
    useGetExpenseEntriesByScheduleIdQuery
} from "@/redux/generated/redux-api.ts";

const getMaximumAmount = (value: EstimatedAmount) => {
    const {type} = value
    switch (type) {
        case "FIXED":
            return value.amount;
        case "RANGE":
            return value.max
        case "VARIANCE_AMOUNT":
            return value.amount + value.variance
        case "VARIANCE_PERCENT":
            return value.amount * (1 + value.variancePercent)
    }
}

interface ExpenseEntryScheduleStatProps {
    skip: boolean;
    schedule: ExpenseScheduleResponse;
}

export const ExpenseEntryScheduleStat = (props: ExpenseEntryScheduleStatProps) => {
    const {skip, schedule} = props;
    const {data = [], isLoading} = useGetExpenseEntriesByScheduleIdQuery({blueprintId: schedule.id}, {skip})
    const sum = data.reduce((prev, curr) => prev + curr.amount, 0);
    const maximumAmount = getMaximumAmount(schedule.estimatedAmount);
    return (
        <StatRoot
            w={'min-content'}
            p={4}
            borderWidth={1}
            borderRadius={8}
        >
            <StatLabel></StatLabel>
            {isLoading && <Spinner/>}
            <HStack>
                <StatValueText
                    value={sum}
                    formatOptions={{style: "currency", currency}}
                />
                <StatTrend isRed={sum > maximumAmount}>
                    <FormatNumber
                        value={sum / maximumAmount}
                        style={"percent"}
                    />
                </StatTrend>
            </HStack>
            <ProgressRoot
                value={sum}
                max={maximumAmount}
                colorPalette={sum > maximumAmount ? "red" : "green"}
            >
                <ProgressBar/>
            </ProgressRoot>
        </StatRoot>
    )
}
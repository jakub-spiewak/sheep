import {FrequencyEnum} from "@/redux/generated/redux-api.ts";

interface ExpenseBlueprintFrequencyProps {
    frequency: FrequencyEnum;
}

export const ExpenseBlueprintFrequency = (props: ExpenseBlueprintFrequencyProps) => {
    const {frequency} = props;
    switch (frequency) {
        case "DAILY":
            return 'Daily'
        case "WEEKLY":
            return 'Weekly'
        case "MONTHLY":
            return 'Monthly'
        case "YEARLY":
            return 'Yearly'
        default:
            return ''
    }
}
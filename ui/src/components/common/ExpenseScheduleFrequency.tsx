import {FrequencyEnum} from "@/redux/generated/redux-api.ts";

interface ExpenseScheduleFrequencyProps {
    frequency: FrequencyEnum;
}

export const ExpenseScheduleFrequency = (props: ExpenseScheduleFrequencyProps) => {
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
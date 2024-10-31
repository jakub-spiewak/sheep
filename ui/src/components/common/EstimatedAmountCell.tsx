import {EstimatedAmount} from "@/redux/generated/redux-api.ts";
import {FormatNumber, HStack, Text} from "@chakra-ui/react";
import {currency} from "@/util/commons.ts";

interface EstimatedAmountCellProps {
    estimatedAmount: EstimatedAmount;
}

export const EstimatedAmountCell = (props: EstimatedAmountCellProps) => {
    const {estimatedAmount} = props
    const {type} = estimatedAmount

    switch (type) {
        case "FIXED": {
            const {amount} = estimatedAmount;
            return (
                <FormatNumber value={amount} style={"currency"} currency={currency}/>
            )
        }
        case "RANGE": {
            const {min, max} = estimatedAmount;
            return (
                <HStack gap={2}>
                    <FormatNumber value={min} style={"currency"} currency={currency}/>
                    <Text>
                        -
                    </Text>
                    <FormatNumber value={max} style={"currency"} currency={currency}/>
                </HStack>
            )
        }
        case "VARIANCE_PERCENT": {
            const {amount, variancePercent} = estimatedAmount;
            return (
                <HStack gap={2}>
                    <FormatNumber value={amount} style={"currency"} currency={currency}/>
                    <Text>
                        ±
                    </Text>
                    <FormatNumber value={variancePercent} style={"percent"}/>
                </HStack>
            )
        }
        case "VARIANCE_AMOUNT": {
            const {amount, variance} = estimatedAmount
            return (
                <HStack gap={2}>
                    <FormatNumber value={amount} style={"currency"} currency={currency}/>
                    <Text>
                        ±
                    </Text>
                    <FormatNumber value={variance} style={"currency"} currency={currency}/>
                </HStack>
            )
        }
    }
}
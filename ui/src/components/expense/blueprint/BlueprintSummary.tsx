import {StatHelpText, StatLabel, StatRoot, StatUpTrend, StatValueText} from "@/components/ui/stat.tsx";
import {useGetFinancialSummaryQuery} from "@/redux/generated/redux-api.ts";
import {currency} from "@/util/commons.ts";
import {FormatNumber, HStack, Spinner, Text} from "@chakra-ui/react";
import {ProgressBar, ProgressRoot} from "@/components/ui/progress.tsx";

export const BlueprintSummary = () => {
    const {data, isLoading} = useGetFinancialSummaryQuery({startDate: "2000-01-01", endDate: "2000-01-01"})

    return (
        <StatRoot w={'min-content'} borderWidth={1} p={4} borderRadius={8}>
            <StatLabel>Summary</StatLabel>
            {isLoading && <Spinner/>}
            <HStack>
                <StatValueText
                    value={data?.netBalance || 0}
                    formatOptions={{style: "currency", currency}}
                />
                <StatUpTrend disableIndicator>
                    <FormatNumber
                        value={(data?.totalExpenses || 0) / (data?.totalIncome || 0)}
                        style={"percent"}
                    />
                </StatUpTrend>
            </HStack>
            <StatHelpText>
                <HStack>
                    <Text textWrap={'nowrap'}>Total income: </Text>
                    <FormatNumber
                        value={(data?.totalIncome || 0)}
                        style={"currency"}
                        currency={currency}
                    />
                </HStack>
            </StatHelpText>
            <StatHelpText>
                <HStack>
                    <Text textWrap={'nowrap'}>Total expenses: </Text>
                    <FormatNumber
                        value={(data?.totalExpenses || 0)}
                        style={"currency"}
                        currency={currency}
                    />
                </HStack>
            </StatHelpText>
            <ProgressRoot max={data?.totalIncome || 0} value={data?.totalExpenses || 0}>
                <ProgressBar/>
            </ProgressRoot>
        </StatRoot>
    )
}
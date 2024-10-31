import {ExpenseBlueprintResponse, useGetExpenseBlueprintsQuery} from "@/redux/generated/redux-api.ts";
import {Center, IconButton, Spinner, Table, Text, VStack} from "@chakra-ui/react";
import {ExpenseBlueprintFrequency} from "@/components/common/ExpenseBlueprintFrequency.tsx";
import {DateRangeCell} from "@/components/common/DateRangeCell.tsx";
import {EstimatedAmountCell} from "@/components/common/EstimatedAmountCell.tsx";
import {MdEdit} from "react-icons/md";

interface ExpenseBlueprintTableProps {
    onEdit?: (value: ExpenseBlueprintResponse) => void;
}

export const ExpenseBlueprintTable = (props: ExpenseBlueprintTableProps) => {
    const {onEdit} = props
    const {data = [], isLoading} = useGetExpenseBlueprintsQuery()
    return (
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeader>Name</Table.ColumnHeader>
                    <Table.ColumnHeader>Frequency</Table.ColumnHeader>
                    <Table.ColumnHeader>Date range</Table.ColumnHeader>
                    <Table.ColumnHeader>Estimated amount</Table.ColumnHeader>
                    <Table.ColumnHeader>Actions</Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    data.map((record, index) => {
                        return (
                            <Table.Row key={`expense_${index}`}>
                                <Table.Cell>{record.name}</Table.Cell>
                                <Table.Cell><ExpenseBlueprintFrequency frequency={record.frequency}/></Table.Cell>
                                <Table.Cell><DateRangeCell from={record.startDate} to={record.endDate}/></Table.Cell>
                                <Table.Cell><EstimatedAmountCell estimatedAmount={record.estimatedAmount}/></Table.Cell>
                                <Table.Cell>
                                    <IconButton
                                        size="sm"
                                        onClick={() => onEdit?.(record)}
                                    >
                                        <MdEdit/>
                                    </IconButton>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })
                }
                {
                    isLoading && <Table.Row>
                        <Table.Cell colSpan={4}>
                            <Center>
                                <VStack>
                                    <Spinner size="xl"/>
                                    <Text>Loading...</Text>
                                </VStack>
                            </Center>
                        </Table.Cell>
                    </Table.Row>
                }
            </Table.Body>
        </Table.Root>
    )
}
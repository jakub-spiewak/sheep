import {
    IncomeBlueprintResponse,
    useDeleteIncomeBlueprintMutation,
    useGetIncomeBlueprintsQuery
} from "@/redux/generated/redux-api.ts";
import {Center, HStack, Spinner, Table, Text, VStack} from "@chakra-ui/react";
import {ExpenseScheduleFrequency} from "@/components/common/ExpenseScheduleFrequency.tsx";
import {DateRangeCell} from "@/components/common/DateRangeCell.tsx";
import {EstimatedAmountCell} from "@/components/common/EstimatedAmountCell.tsx";
import {MdDelete, MdEdit} from "react-icons/md";
import {Button} from "@/components/ui/button.tsx";

interface IncomeBlueprintTableProps {
    onEdit?: (value: IncomeBlueprintResponse) => void;
}

export const IncomeBlueprintTable = (props: IncomeBlueprintTableProps) => {
    const {onEdit} = props
    const {data = [], isLoading} = useGetIncomeBlueprintsQuery();
    const [deleteIncomeBlueprint, {isLoading: isDeleting, originalArgs}] = useDeleteIncomeBlueprintMutation();
    return (
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeader>Name</Table.ColumnHeader>
                    <Table.ColumnHeader>Frequency</Table.ColumnHeader>
                    <Table.ColumnHeader>Date range</Table.ColumnHeader>
                    <Table.ColumnHeader>Estimated amount</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign={"end"}>Actions</Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    data.map((record, index) => {
                        return (
                            <Table.Row key={`income_${index}`}>
                                <Table.Cell>{record.name}</Table.Cell>
                                <Table.Cell><ExpenseScheduleFrequency frequency={record.frequency}/></Table.Cell>
                                <Table.Cell><DateRangeCell from={record.startDate} to={record.endDate}/></Table.Cell>
                                <Table.Cell><EstimatedAmountCell estimatedAmount={record.estimatedAmount}/></Table.Cell>
                                <Table.Cell>
                                    <HStack >
                                        <Button
                                            ml={'auto'}
                                            size="sm"
                                            variant="outline"
                                            p={0}
                                            onClick={() => onEdit?.(record)}
                                        >
                                            <MdEdit/>
                                        </Button>
                                        <Button
                                            size="sm"
                                            colorPalette="red"
                                            variant="outline"
                                            p={0}
                                            loading={isDeleting && originalArgs?.blueprintId === record.id}
                                            onClick={() => deleteIncomeBlueprint({blueprintId: record.id})}
                                        >
                                            <MdDelete/>
                                        </Button>
                                    </HStack>
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
import {
    ExpenseEntryResponse,
    useDeleteExpenseEntryMutation,
    useGetExpenseEntriesQuery,
} from "@/redux/generated/redux-api.ts";
import {Center, FormatNumber, HStack, Spinner, Table, Text, VStack} from "@chakra-ui/react";
import {MdDelete, MdEdit} from "react-icons/md";
import {TagsCell} from "@/components/common/TagsCell.tsx";
import {Button} from "@/components/ui/button.tsx";
import {currency} from "@/util/commons.ts";

interface ExpenseEntryTableProps {
    onEdit?: (value: ExpenseEntryResponse) => void;
}

export const ExpenseEntryTable = (props: ExpenseEntryTableProps) => {
    const {onEdit} = props
    const {data = [], isLoading} = useGetExpenseEntriesQuery();
    const [deleteExpenseEntry, {isLoading: isDeleting, originalArgs}] = useDeleteExpenseEntryMutation();
    return (
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeader>Name</Table.ColumnHeader>
                    <Table.ColumnHeader>Date range</Table.ColumnHeader>
                    <Table.ColumnHeader>Estimated amount</Table.ColumnHeader>
                    <Table.ColumnHeader>Tags</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign={"end"}>Actions</Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    data.map((record, index) => {
                        return (
                            <Table.Row key={`expense_${index}`}>
                                <Table.Cell>{record.name}</Table.Cell>
                                <Table.Cell>{new Date(record.date).toLocaleDateString()}</Table.Cell>
                                <Table.Cell>
                                    <FormatNumber value={record.amount} style={"currency"} currency={currency}/>
                                </Table.Cell>
                                <Table.Cell><TagsCell tags={record.tags}/></Table.Cell>
                                <Table.Cell>
                                    <HStack>
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
                                            loading={isDeleting && originalArgs?.entryId === record.id}
                                            onClick={() => deleteExpenseEntry({entryId: record.id})}
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
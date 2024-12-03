import {
    ExpenseEntryResponse,
    useDeleteExpenseEntryMutation,
    useGetExpenseEntriesQuery,
    useGetExpenseScheduleByIdQuery,
} from "@/redux/generated/redux-api.ts";
import {Center, FormatNumber, HStack, Spinner, Table, Text, VStack} from "@chakra-ui/react";
import {MdDelete, MdEdit} from "react-icons/md";
import {TagsCell} from "@/components/common/TagsCell.tsx";
import {Button} from "@/components/ui/button.tsx";
import {currency} from "@/util/commons.ts";
import {useAppDispatch, useAppSelector, useGetCurrentMonth} from "@/redux/store.ts";
import {RiSortAsc, RiSortDesc} from "react-icons/ri";
import {setSort} from "@/redux/slices/currentScheduleSlice.ts";

interface ScheduleExpenseNameProps {
    id?: string | null;
}

const ScheduleExpenseName = (props: ScheduleExpenseNameProps) => {
    const {data} = useGetExpenseScheduleByIdQuery({blueprintId: props.id!}, {skip: !props.id});
    if (!data) {
        return null;
    }
    return data.name
}

interface ExpenseEntryTableProps {
    onEdit?: (value: ExpenseEntryResponse) => void;
}

export const ExpenseEntryTable = (props: ExpenseEntryTableProps) => {
    const {onEdit} = props
    const month = useGetCurrentMonth()
    const {tags, anyOfTags} = useAppSelector(state => state.currentTags);
    const scheduleId = useAppSelector(state => state.currentSchedule.schedule)
    const sort = useAppSelector(state => state.currentSchedule.sort)
    const dispatch = useAppDispatch()
    const {data = [], isLoading} = useGetExpenseEntriesQuery({
        month,
        scheduleId,
        allOfTags: anyOfTags ? undefined : tags,
        anyOfTags: anyOfTags ? tags : undefined,
        sort: sort?.field,
        order: sort?.order,
    });
    const [deleteExpenseEntry, {isLoading: isDeleting, originalArgs}] = useDeleteExpenseEntryMutation();
    return (
        <Table.ScrollArea w={"full"}>
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>
                            <Button
                                pl={0}
                                variant="plain"
                                onClick={() => {
                                    dispatch(setSort('name'))
                                }}
                            >
                                {sort?.field === 'name' && sort.order === 'asc' && <RiSortAsc/>}
                                {sort?.field === 'name' && sort.order === 'desc' && <RiSortDesc/>}
                                Name
                            </Button>
                        </Table.ColumnHeader>
                        <Table.ColumnHeader>
                            <Button
                                pl={0}
                                variant="plain"
                                onClick={() => {
                                    dispatch(setSort('amount'))
                                }}
                            >
                                {sort?.field === 'amount' && sort.order === 'asc' && <RiSortAsc/>}
                                {sort?.field === 'amount' && sort.order === 'desc' && <RiSortDesc/>}
                                Amount
                            </Button>
                        </Table.ColumnHeader>
                        <Table.ColumnHeader>
                            <Button
                                pl={0}
                                variant="plain"
                                onClick={() => {
                                    dispatch(setSort('date'))
                                }}
                            >
                                {sort?.field === 'date' && sort.order === 'asc' && <RiSortAsc/>}
                                {sort?.field === 'date' && sort.order === 'desc' && <RiSortDesc/>}
                                Date
                            </Button>
                        </Table.ColumnHeader>
                        <Table.ColumnHeader>
                            <Button
                                pl={0}
                                variant="plain"
                                onClick={() => {
                                    dispatch(setSort('schedule'))
                                }}
                            >
                                {sort?.field === 'schedule' && sort.order === 'asc' && <RiSortAsc/>}
                                {sort?.field === 'schedule' && sort.order === 'desc' && <RiSortDesc/>}
                                Parent schedule
                            </Button>
                        </Table.ColumnHeader>
                        <Table.ColumnHeader>
                            <Button
                                pl={0}
                                variant="plain"
                                onClick={() => {
                                    dispatch(setSort('tags'))
                                }}
                            >
                                {sort?.field === 'tags' && sort.order === 'asc' && <RiSortAsc/>}
                                {sort?.field === 'tags' && sort.order === 'desc' && <RiSortDesc/>}
                                Tags
                            </Button>
                        </Table.ColumnHeader>
                        <Table.ColumnHeader textAlign={"end"}>Actions</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        data.map((record, index) => {
                            return (
                                <Table.Row key={`expense_${index}`}>
                                    <Table.Cell>{record.name}</Table.Cell>
                                    <Table.Cell fontWeight={"bold"}>
                                        <FormatNumber value={record.amount} style={"currency"} currency={currency}/>
                                    </Table.Cell>
                                    <Table.Cell>{new Date(record.date).toLocaleDateString()}</Table.Cell>
                                    <Table.Cell><ScheduleExpenseName id={record.blueprintId}/></Table.Cell>
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
                            <Table.Cell colSpan={6}>
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
        </Table.ScrollArea>
    )
}
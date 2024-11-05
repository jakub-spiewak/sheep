import {TagResponse, useDeleteTagMutation, useGetTagsQuery} from "@/redux/generated/redux-api.ts";
import {Center, HStack, Spinner, Table, Text, VStack} from "@chakra-ui/react";
import {MdDelete, MdEdit} from "react-icons/md";
import {Button} from "@/components/ui/button.tsx";

interface ExpenseScheduleTableProps {
    onEdit?: (value: TagResponse) => void;
}

export const TagTable = (props: ExpenseScheduleTableProps) => {
    const {onEdit} = props
    const {data = [], isLoading} = useGetTagsQuery()
    const [deleteTag, {isLoading: isDeleting, originalArgs}] = useDeleteTagMutation()
    return (
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeader>Name</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="right">Actions</Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    data.map((record, index) => {
                        return (
                            <Table.Row key={`tag_${index}`}>
                                <Table.Cell>{record.name}</Table.Cell>
                                <Table.Cell>
                                    <HStack>
                                        <Button
                                            ml={'auto'}
                                            size="sm"
                                            p={0}
                                            variant={"outline"}
                                            onClick={() => onEdit?.(record)}
                                        >
                                            <MdEdit/>
                                        </Button>
                                        <Button
                                            size="sm"
                                            colorPalette="red"
                                            variant="outline"
                                            p={0}
                                            loading={isDeleting && originalArgs?.tagId === record.id}
                                            onClick={() => deleteTag({tagId: record.id})}
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
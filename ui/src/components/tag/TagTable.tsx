import {TagResponse, useGetTagsQuery} from "@/redux/generated/redux-api.ts";
import {Center, IconButton, Spinner, Table, Text, VStack} from "@chakra-ui/react";
import {MdEdit} from "react-icons/md";

interface ExpenseBlueprintTableProps {
    onEdit?: (value: TagResponse) => void;
}

export const TagTable = (props: ExpenseBlueprintTableProps) => {
    const {onEdit} = props
    const {data = [], isLoading} = useGetTagsQuery()
    return (
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeader>Name</Table.ColumnHeader>
                    <Table.ColumnHeader>Actions</Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    data.map((record, index) => {
                        return (
                            <Table.Row key={`tag_${index}`}>
                                <Table.Cell>{record.name}</Table.Cell>
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
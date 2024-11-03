import {Center, Flex, Show, Spinner, VStack} from "@chakra-ui/react";
import {useGetTagsQuery} from "@/redux/generated/redux-api.ts";
import {Field} from "@/components/ui/field.tsx";
import {Button} from "@/components/ui/button.tsx";


interface TagFieldProps {
    tags?: string[];
    onChange?: (value: string[]) => void;
}

export const TagField = (props: TagFieldProps) => {
    const {tags = [], onChange} = props;

    const {data = [], isLoading} = useGetTagsQuery()

    return (
        <Field
            w={'full'}
            label="Tags"
            helperText="Select the relevant tags by clicking them on the list above"
        >
            <VStack w={'full'}>
                <Flex
                    w={'full'}
                    flexWrap={'wrap'}
                    gap={2}
                >
                    <Show when={isLoading}>
                        <Center>
                            <Spinner/>
                        </Center>
                    </Show>
                    {
                        data.map((tag, index) => {
                            return (
                                <Button
                                    key={`tag_${index}`}
                                    size={'2xs'}
                                    variant={tags?.includes(tag.id) ? 'solid' : 'outline'}
                                    borderWidth={1}
                                    colorPalette={'teal'}
                                    onClick={() => {
                                        if (tags?.includes(tag.id)) {
                                            onChange?.(tags.filter((t) => t !== tag.id))
                                        } else {
                                            onChange?.([...tags, tag.id])
                                        }
                                    }}
                                >
                                    {tag.name}
                                </Button>
                            )
                        })
                    }
                </Flex>
            </VStack>
        </Field>
    );
};

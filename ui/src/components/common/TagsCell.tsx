import {useGetTagsQuery} from "@/redux/generated/redux-api.ts";
import {useMemo} from "react";
import {Flex} from "@chakra-ui/react";
import {Tag} from "@/components/ui/tag.tsx";

interface TagsCellProps {
    tags?: string[];
}

export const TagsCell = (props: TagsCellProps) => {
    const {tags} = props;
    const {data = []} = useGetTagsQuery()
    const tagsNames = useMemo(() => {
        return tags?.map(tag => data.find(t => t.id === tag)?.name);
    }, [tags, data])
    return (
        <Flex
            gap={1}
            flexWrap="wrap"
        >
            {
                tagsNames?.map((tag, index) => (
                    <Tag key={`tag_${index}`}>{tag}</Tag>
                ))
            }
        </Flex>
    )
}
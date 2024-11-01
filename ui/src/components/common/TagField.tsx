import {Flex, HStack, Icon, Input, VStack} from "@chakra-ui/react";
import {useGetTagsQuery} from "@/redux/generated/redux-api.ts";
import {Field} from "@/components/ui/field.tsx";
import {MenuContent, MenuItem, MenuRoot, MenuTrigger} from "@/components/ui/menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useEffect, useMemo, useRef, useState} from "react";
import {FaCheck} from "react-icons/fa";
import {Tag} from "@/components/ui/tag.tsx";


interface TagFieldProps {
    tags?: string[];
    onChange?: (value: string[]) => void;
}

export const TagField = (props: TagFieldProps) => {
    const {tags = [], onChange} = props;

    // const fieldRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const {data = [], isLoading} = useGetTagsQuery()
    const [searchValue, setSearchValue] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const filteredTags = useMemo(() => data.filter((tag) => {
        if (searchValue === '') {
            return true
        }
        return tag.name.toLowerCase().includes(searchValue.toLowerCase())
    }), [data, searchValue]);

    useEffect(() => {
        if (searchValue === '') {
            return;
        }
        setIsMenuOpen(true);
    }, [searchValue]);

    return (
        <Field
            w={'full'}
            // ref={fieldRef}
            // onBlur={(e) => {
            //     // const isInsideComponent = !menuRef.current?.contains(e.relatedTarget as Node) && !inputRef.current?.contains(e.relatedTarget as Node);
            //     if (searchValue !== '') {
            //         setSearchValue('')
            //     } else {
            //         setIsMenuOpen(false);
            //     }
            // }}
            label="Tags"
            helperText="You can add multiple tags by selecting them from the menu. You can also type in the search box to search for tags."
        >
            <VStack w={'full'}>
                <HStack
                    alignItems={'flex-start'}
                    gap={2}
                    w={'full'}
                >
                    <Input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Search..."
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Escape') {
                                setSearchValue('');
                                setIsMenuOpen(false);
                            }
                        }}
                    />
                    <MenuRoot
                        open={isMenuOpen}
                        onSelect={e => {
                            if (tags.includes(e.value)) {
                                onChange?.([...tags].filter((tag) => tag !== e.value))
                            } else {
                                onChange?.([...tags, e.value])
                            }

                        }}
                    >
                        <MenuTrigger asChild>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    if (searchValue !== '' && isMenuOpen) {
                                        setIsMenuOpen(false);
                                        setSearchValue('');
                                    } else if (isMenuOpen) {
                                        setIsMenuOpen(false);
                                    } else {
                                        setIsMenuOpen(true);
                                    }
                                }}
                            >
                                Open
                            </Button>
                        </MenuTrigger>
                        <MenuContent
                            ref={menuRef}
                            // portalRef={fieldRef}
                            portalled={false}
                        >
                            {filteredTags
                                .filter((tag) => tags?.includes(tag.id))
                                .map((tag, index) => {
                                    return (
                                        <MenuItem
                                            key={`tag_item_${index}`}
                                            value={tag.id}
                                        >
                                            <Icon><FaCheck/></Icon>
                                            {tag.name}
                                        </MenuItem>
                                    )
                                })}
                            {filteredTags
                                .filter((tag) => !tags?.includes(tag.id))
                                .map((tag, index) => {
                                    return (
                                        <MenuItem
                                            key={`tag_item_${index}`}
                                            value={tag.id}
                                        >
                                            {tag.name}
                                        </MenuItem>
                                    )
                                })}
                            {filteredTags.length === 0 && <MenuItem value={''} disabled>No matches</MenuItem>}
                        </MenuContent>
                    </MenuRoot>
                </HStack>
                <Flex
                    w={'full'}
                    flexWrap={'wrap'}
                    gap={2}
                >
                    {
                        data
                            .filter((tag) => tags?.includes(tag.id))
                            .map((tag, index) => {
                                return (
                                    <Tag key={`tag_${index}`}>{tag.name}</Tag>
                                )
                            })
                    }
                </Flex>
            </VStack>
        </Field>
    );
};

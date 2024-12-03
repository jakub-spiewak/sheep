import {createListCollection, Flex, Group, HStack, Icon, Input, ListCollection, VStack} from "@chakra-ui/react";
import {Button} from "@/components/ui/button.tsx";
import {TbCalendarDot, TbCalendarDown, TbCalendarUp, TbFilterPlus, TbLogicAnd, TbLogicOr} from "react-icons/tb";
import {MenuContent, MenuRoot, MenuTrigger, MenuTriggerItem} from "@/components/ui/menu.tsx";
import {RadioCardItem, RadioCardRoot} from "@/components/ui/radio-card.tsx";
import {FaEquals, FaGreaterThanEqual, FaLessThanEqual} from "react-icons/fa6";
import {NumberInputField, NumberInputRoot} from "@/components/ui/number-input";
import {currency} from "@/util/commons";
import {Field} from "@/components/ui/field.tsx";
import {useGetExpenseSchedulesQuery, useGetTagsQuery} from "@/redux/generated/redux-api.ts";
import {useAppDispatch, useAppSelector} from "@/redux/store.ts";
import {setCurrentTags} from "@/redux/slices/currentTagsSlice";
import {useMemo, useRef} from "react";
import {SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText} from "@/components/ui/select";

export const ExpenseEntryFilters = () => {
    const {data: allTags = []} = useGetTagsQuery()
    const {tags = []} = useAppSelector(state => state.currentTags)
    const dispatch = useAppDispatch()
    const {data: schedules = []} = useGetExpenseSchedulesQuery()
    const scheduleOptions = useMemo<ListCollection>(() => {
        return createListCollection({
            items: [
                {
                    value: "null",
                    label: "Without parent"
                }, ...schedules.map(s => ({value: s.id, label: s.name}))]
        })
    }, [schedules])
    const contentRef = useRef<HTMLDivElement>(null)
    return (
        <HStack>
            <MenuRoot>
                <MenuTrigger asChild>
                    <Button>
                        <TbFilterPlus/>
                        Add filter
                    </Button>
                </MenuTrigger>
                <MenuContent>
                    <MenuRoot positioning={{placement: "right-start", gutter: 2}}>
                        <MenuTriggerItem value={"amount"}>Amount</MenuTriggerItem>
                        <MenuContent p={4}>
                            <VStack gap={4}>
                                <RadioCardRoot defaultValue={'eq'}>
                                    {/*<RadioCardLabel>Select amount filter</RadioCardLabel>*/}
                                    <Group attached orientation="horizontal" textWrap="nowrap">
                                        <RadioCardItem
                                            icon={
                                                <Icon fontSize="2xl" color="fg.muted" mb="2">
                                                    <FaLessThanEqual/>
                                                </Icon>
                                            }
                                            indicator={null}
                                            value={'max'}
                                            label={'Less than'}
                                        />
                                        <RadioCardItem
                                            icon={
                                                <Icon fontSize="2xl" color="fg.muted" mb="2">
                                                    <FaGreaterThanEqual/>
                                                </Icon>
                                            }
                                            indicator={null}
                                            value={'min'}
                                            label={'More than'}
                                        />
                                        <RadioCardItem
                                            icon={
                                                <Icon fontSize="2xl" color="fg.muted" mb="2">
                                                    <FaEquals/>
                                                </Icon>
                                            }
                                            indicator={null}
                                            value={'eq'}
                                            label={'Equal to'}
                                        />
                                    </Group>
                                </RadioCardRoot>
                                <Field
                                    label={'Amount'}
                                >
                                    <NumberInputRoot
                                        w={'full'}
                                        min={0}
                                        formatOptions={{
                                            style: "currency",
                                            currency,
                                            currencyDisplay: "code",
                                            currencySign: "accounting",
                                        }}
                                    >
                                        <NumberInputField/>
                                    </NumberInputRoot>
                                </Field>
                                <Button w={'full'}>Apply filter</Button>
                            </VStack>
                        </MenuContent>
                    </MenuRoot>
                    <MenuRoot positioning={{placement: "right-start", gutter: 2}}>
                        <MenuTriggerItem value={"amount"}>Date</MenuTriggerItem>
                        <MenuContent p={4}>
                            <VStack gap={4}>
                                <RadioCardRoot defaultValue={'eq'}>
                                    {/*<RadioCardLabel>Select amount filter</RadioCardLabel>*/}
                                    <Group attached orientation="horizontal" textWrap="nowrap">
                                        <RadioCardItem
                                            icon={
                                                <Icon fontSize="2xl" color="fg.muted" mb="2">
                                                    <TbCalendarDown/>
                                                </Icon>
                                            }
                                            indicator={null}
                                            value={'max'}
                                            label={'Before'}
                                        />
                                        <RadioCardItem
                                            icon={
                                                <Icon fontSize="2xl" color="fg.muted" mb="2">
                                                    <TbCalendarUp/>
                                                </Icon>
                                            }
                                            indicator={null}
                                            value={'min'}
                                            label={'After'}
                                        />
                                        <RadioCardItem
                                            icon={
                                                <Icon fontSize="2xl" color="fg.muted" mb="2">
                                                    <TbCalendarDot/>
                                                </Icon>
                                            }
                                            indicator={null}
                                            value={'eq'}
                                            label={'Exact'}
                                        />
                                    </Group>
                                </RadioCardRoot>
                                <Field
                                    label={'Date'}
                                >
                                    <Input type={'date'}/>
                                </Field>
                                <Button w={'full'}>Apply filter</Button>
                            </VStack>
                        </MenuContent>
                    </MenuRoot>
                    <MenuRoot positioning={{placement: "right-start", gutter: 2}}>
                        <MenuTriggerItem value={"amount"}>Tags</MenuTriggerItem>
                        <MenuContent p={4}>
                            <VStack gap={4}>
                                <RadioCardRoot defaultValue={'anyOf'} w={'full'}>
                                    {/*<RadioCardLabel>Select amount filter</RadioCardLabel>*/}
                                    <Group
                                        w={'full'}
                                        attached
                                        orientation="horizontal"
                                        textWrap="nowrap"
                                    >
                                        <RadioCardItem
                                            w={'full'}
                                            icon={
                                                <Icon fontSize="2xl" color="fg.muted" mb="2">
                                                    <TbLogicOr/>
                                                </Icon>
                                            }
                                            indicator={null}
                                            value={'anyOf'}
                                            label={'Any of'}
                                        />
                                        <RadioCardItem
                                            w={'full'}
                                            icon={
                                                <Icon fontSize="2xl" color="fg.muted" mb="2">
                                                    <TbLogicAnd/>
                                                </Icon>
                                            }
                                            indicator={null}
                                            value={'allOf'}
                                            label={'All of'}
                                        />
                                    </Group>
                                </RadioCardRoot>
                                <Field
                                    label={'Tags'}
                                    // helperText={"Click to select tags. Selected tags will be highlighted. Entries will be filtered based on the selected tags."}
                                >
                                    <Flex
                                        w={'full'}
                                        flexWrap={'wrap'}
                                        gap={2}
                                    >
                                        {
                                            allTags
                                                .map((tag, index) => {
                                                    return (
                                                        <Button
                                                            key={`tag_${index}`}
                                                            size={'2xs'}
                                                            variant={tags?.includes(tag.id) ? 'solid' : 'outline'}
                                                            borderWidth={1}
                                                            colorPalette={'teal'}
                                                            onClick={() => {
                                                                if (tags?.includes(tag.id)) {
                                                                    dispatch(setCurrentTags(tags.filter((t) => t !== tag.id)))
                                                                } else {
                                                                    dispatch(setCurrentTags([...tags, tag.id]))
                                                                }
                                                            }}
                                                        >
                                                            {tag.name}
                                                        </Button>
                                                    )
                                                })
                                        }
                                    </Flex>
                                </Field>
                                <Button w={'full'}>Apply filter</Button>
                            </VStack>
                        </MenuContent>
                    </MenuRoot>
                    <MenuRoot positioning={{placement: "right-start", gutter: 2}}>
                        <MenuTriggerItem value={"amount"}>Schedule</MenuTriggerItem>
                        <MenuContent
                            p={4}
                            ref={contentRef}
                        >
                            <VStack gap={4}>
                                <Field
                                    label={"Schedule"}
                                    helperText={"Select the appropriate schedule. Choosing 'Without parent' will display entries without any parent schedule."}
                                >
                                    <SelectRoot
                                        collection={scheduleOptions}
                                        multiple
                                        closeOnSelect={false}
                                        positioning={{sameWidth: true, placement: "top"}}
                                    >
                                        <SelectTrigger>
                                            <SelectValueText placeholder="Select movie"/>
                                        </SelectTrigger>
                                        <SelectContent
                                            portalRef={contentRef}
                                        >
                                            {scheduleOptions.items.map((option) => (
                                                <SelectItem item={option} key={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </SelectRoot>
                                </Field>
                                <Button w={'full'}>Apply filter</Button>
                            </VStack>
                        </MenuContent>
                    </MenuRoot>
                </MenuContent>
            </MenuRoot>
        </HStack>
    )
}
import {useEffect, useMemo, useState} from "react";
import {ExpenseEntryResponse, useGetExpenseSchedulesQuery, useGetTagsQuery} from "@/redux/generated/redux-api.ts";
import {Button, Flex, HStack, IconButton, Text, VStack} from "@chakra-ui/react";
import {ExpenseEntryDialog} from "@/components/expense/entry/ExpenseEntryDialog.tsx";
import {ExpenseEntryTable} from "@/components/expense/entry/ExpenseEntryTable.tsx";
import {LuMinus, LuPlus} from "react-icons/lu";
import {useAppDispatch, useAppSelector, useGetCurrentMonth} from "@/redux/store.ts";
import {decrement, increment} from "@/redux/slices/currentMonthSlice.ts";
import {NativeSelectField, NativeSelectRoot} from "@/components/ui/native-select.tsx";
import {setCurrentSchedule} from "@/redux/slices/currentScheduleSlice.ts";
import {setAnyOfTags, setCurrentTags} from "@/redux/slices/currentTagsSlice.ts";
import {Field} from "@/components/ui/field.tsx";
import {Switch} from "@/components/ui/switch.tsx";
import {ExpenseEntryFilters} from "@/pages/ExpenseEntryFilters.tsx";

export const ExpenseEntryPage = () => {
    const [isExpenseEntryDialogOpen, setIsExpenseEntryDialogOpen] = useState(false)
    const [expenseBlueprintToEdit, setExpenseEntryToEdit] = useState<ExpenseEntryResponse>()

    const month = useGetCurrentMonth()

    const {data: schedules = []} = useGetExpenseSchedulesQuery()
    const scheduleOptions = useMemo<{ value: string, label: string }[]>(() => {
        return [
            {
                value: "",
                label: "All"
            },
            {
                value: "null",
                label: "Without parent"
            }, ...schedules.map(s => ({value: s.id, label: s.name}))]
    }, [schedules])

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (expenseBlueprintToEdit) {
            setIsExpenseEntryDialogOpen(true);
        }
    }, [expenseBlueprintToEdit]);

    useEffect(() => {
        if (!isExpenseEntryDialogOpen) {
            setExpenseEntryToEdit(undefined)
        }
    }, [isExpenseEntryDialogOpen]);

    return (
        <VStack alignItems={"flex-start"}>
            <HStack
                gap={4}
                w={'full'}
                justifyContent={'min-content'}
                alignItems={'flex-start'}
                flexDir={['column', null, 'row']}
            >
                <Field
                    label={"Month"}
                    w={'min-content'}
                    helperText={"Select the month to view the entries for."}
                >
                    <HStack>
                        <IconButton
                            variant="outline"
                            size="sm"
                            onClick={() => dispatch(decrement())}
                        >
                            <LuMinus/>
                        </IconButton>
                        <Text wordBreak={'keep-all'}>{month}</Text>
                        <IconButton
                            variant="outline"
                            size="sm"
                            onClick={() => dispatch(increment())}
                        >
                            <LuPlus/>
                        </IconButton>
                    </HStack>
                </Field>
                {/*<Field*/}
                {/*    label={"Schedule"}*/}
                {/*    helperText={"Select the appropriate schedule. Choosing 'All' will display all entries, while 'Without parent' will display entries without any parent schedule."}*/}
                {/*>*/}
                {/*    <NativeSelectRoot>*/}
                {/*        <NativeSelectField*/}
                {/*            value={currentSchedule}*/}
                {/*            onChange={({target: value}) => {*/}
                {/*                if (value.value === '') {*/}
                {/*                    dispatch(setCurrentSchedule(undefined))*/}
                {/*                } else {*/}
                {/*                    dispatch(setCurrentSchedule(value.value))*/}
                {/*                }*/}
                {/*            }}*/}
                {/*            items={scheduleOptions}*/}
                {/*        />*/}
                {/*    </NativeSelectRoot>*/}
                {/*</Field>*/}
                {/*<Field*/}
                {/*    label={'Tags'}*/}
                {/*    helperText={"Click to select tags. Selected tags will be highlighted. Entries will be filtered based on the selected tags."}*/}
                {/*>*/}
                {/*    <Flex*/}
                {/*        w={'full'}*/}
                {/*        flexWrap={'wrap'}*/}
                {/*        gap={2}*/}
                {/*    >*/}
                {/*        {*/}
                {/*            allTags*/}
                {/*                .map((tag, index) => {*/}
                {/*                    return (*/}
                {/*                        <Button*/}
                {/*                            key={`tag_${index}`}*/}
                {/*                            size={'2xs'}*/}
                {/*                            variant={tags?.includes(tag.id) ? 'solid' : 'outline'}*/}
                {/*                            borderWidth={1}*/}
                {/*                            colorPalette={'teal'}*/}
                {/*                            onClick={() => {*/}
                {/*                                if (tags?.includes(tag.id)) {*/}
                {/*                                    dispatch(setCurrentTags(tags.filter((t) => t !== tag.id)))*/}
                {/*                                } else {*/}
                {/*                                    dispatch(setCurrentTags([...tags, tag.id]))*/}
                {/*                                }*/}
                {/*                            }}*/}
                {/*                        >*/}
                {/*                            {tag.name}*/}
                {/*                        </Button>*/}
                {/*                    )*/}
                {/*                })*/}
                {/*        }*/}
                {/*    </Flex>*/}
                {/*    <Field*/}
                {/*        label={anyOfTags ? 'Match one' : 'Match all'}*/}
                {/*        orientation={'horizontal'}*/}
                {/*        w={'min-content'}*/}
                {/*    >*/}
                {/*        <Switch*/}
                {/*            size={'sm'}*/}
                {/*            checked={anyOfTags}*/}
                {/*            onCheckedChange={e => dispatch(setAnyOfTags(e.checked))}*/}
                {/*        />*/}
                {/*    </Field>*/}
                {/*</Field>*/}
                <ExpenseEntryFilters />
                <ExpenseEntryDialog
                    open={isExpenseEntryDialogOpen}
                    setOpen={setIsExpenseEntryDialogOpen}
                    valueToUpdate={expenseBlueprintToEdit}
                />
            </HStack>
            <ExpenseEntryTable onEdit={setExpenseEntryToEdit}/>
        </VStack>
    )

}
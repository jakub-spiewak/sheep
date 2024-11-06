import {useEffect, useState} from "react";
import {ExpenseEntryResponse} from "@/redux/generated/redux-api.ts";
import {VStack} from "@chakra-ui/react";
import {ExpenseEntryDialog} from "@/components/expense/entry/ExpenseEntryDialog.tsx";
import {ExpenseEntryTable} from "@/components/expense/entry/ExpenseEntryTable.tsx";

export const ExpenseEntryPage = () => {

    const [isExpenseEntryDialogOpen, setIsExpenseEntryDialogOpen] = useState(false)
    const [expenseBlueprintToEdit, setExpenseEntryToEdit] = useState<ExpenseEntryResponse>()

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
            <ExpenseEntryDialog
                open={isExpenseEntryDialogOpen}
                setOpen={setIsExpenseEntryDialogOpen}
                valueToUpdate={expenseBlueprintToEdit}
            />
            <ExpenseEntryTable onEdit={setExpenseEntryToEdit}/>
        </VStack>
    )

}
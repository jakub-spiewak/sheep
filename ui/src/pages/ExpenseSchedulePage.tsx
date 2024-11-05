import {ExpenseScheduleDialog} from "@/components/expense/blueprint/ExpenseScheduleDialog.tsx";
import {useEffect, useState} from "react";
import {ExpenseScheduleTable} from "@/components/expense/blueprint/ExpenseScheduleTable.tsx";
import {ExpenseScheduleResponse} from "@/redux/generated/redux-api.ts";
import {VStack} from "@chakra-ui/react";

export const ExpenseSchedulePage = () => {

    const [isExpenseScheduleDialogOpen, setIsExpenseScheduleDialogOpen] = useState(false)
    const [expenseBlueprintToEdit, setExpenseScheduleToEdit] = useState<ExpenseScheduleResponse>()

    useEffect(() => {
        if (expenseBlueprintToEdit) {
            setIsExpenseScheduleDialogOpen(true);
        }
    }, [expenseBlueprintToEdit]);

    useEffect(() => {
        if (!isExpenseScheduleDialogOpen) {
            setExpenseScheduleToEdit(undefined)
        }
    }, [isExpenseScheduleDialogOpen]);

    return (
        <VStack alignItems={"flex-start"}>
            <ExpenseScheduleDialog
                open={isExpenseScheduleDialogOpen}
                setOpen={setIsExpenseScheduleDialogOpen}
                valueToUpdate={expenseBlueprintToEdit}
            />
            <ExpenseScheduleTable onEdit={setExpenseScheduleToEdit}/>
        </VStack>
    )

}
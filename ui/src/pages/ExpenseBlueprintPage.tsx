import {ExpenseBlueprintDialog} from "@/components/expense/blueprint/ExpenseBlueprintDialog.tsx";
import {useEffect, useState} from "react";
import {ExpenseBlueprintTable} from "@/components/expense/blueprint/ExpenseBlueprintTable.tsx";
import {ExpenseBlueprintResponse} from "@/redux/generated/redux-api.ts";
import {VStack} from "@chakra-ui/react";

export const ExpenseBlueprintPage = () => {

    const [isExpenseBlueprintDialogOpen, setIsExpenseBlueprintDialogOpen] = useState(false)
    const [expenseBlueprintToEdit, setExpenseBlueprintToEdit] = useState<ExpenseBlueprintResponse>()

    useEffect(() => {
        if (expenseBlueprintToEdit) {
            setIsExpenseBlueprintDialogOpen(true);
        }
    }, [expenseBlueprintToEdit]);

    useEffect(() => {
        if (!isExpenseBlueprintDialogOpen) {
            setExpenseBlueprintToEdit(undefined)
        }
    }, [isExpenseBlueprintDialogOpen]);

    return (
        <VStack alignItems={"flex-start"}>
            <ExpenseBlueprintDialog
                open={isExpenseBlueprintDialogOpen}
                setOpen={setIsExpenseBlueprintDialogOpen}
                valueToUpdate={expenseBlueprintToEdit}
            />
            <ExpenseBlueprintTable onEdit={setExpenseBlueprintToEdit}/>
        </VStack>
    )

}
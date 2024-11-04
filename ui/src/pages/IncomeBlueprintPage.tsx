import {IncomeBlueprintDialog} from "@/components/income/blueprint/IncomeBlueprintDialog.tsx";
import {useEffect, useState} from "react";
import {IncomeBlueprintTable} from "@/components/income/blueprint/IncomeBlueprintTable.tsx";
import {IncomeBlueprintResponse} from "@/redux/generated/redux-api.ts";
import {VStack} from "@chakra-ui/react";

export const IncomeBlueprintPage = () => {

    const [isIncomeBlueprintDialogOpen, setIsIncomeBlueprintDialogOpen] = useState(false)
    const [expenseBlueprintToEdit, setIncomeBlueprintToEdit] = useState<IncomeBlueprintResponse>()

    useEffect(() => {
        if (expenseBlueprintToEdit) {
            setIsIncomeBlueprintDialogOpen(true);
        }
    }, [expenseBlueprintToEdit]);

    useEffect(() => {
        if (!isIncomeBlueprintDialogOpen) {
            setIncomeBlueprintToEdit(undefined)
        }
    }, [isIncomeBlueprintDialogOpen]);

    return (
        <VStack alignItems={"flex-start"}>
            <IncomeBlueprintDialog
                open={isIncomeBlueprintDialogOpen}
                setOpen={setIsIncomeBlueprintDialogOpen}
                valueToUpdate={expenseBlueprintToEdit}
            />
            <IncomeBlueprintTable onEdit={setIncomeBlueprintToEdit}/>
        </VStack>
    )

}
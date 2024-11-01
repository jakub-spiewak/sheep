import {ColorModeButton} from "@/components/ui/color-mode.tsx";
import {Heading, HStack, VStack} from "@chakra-ui/react";
import {ExpenseBlueprintDialog} from "@/components/expense/blueprint/ExpenseBlueprintDialog.tsx";
import {ExpenseBlueprintTable} from "@/components/expense/blueprint/ExpenseBlueprintTable.tsx";
import {useEffect, useState} from "react";
import {ExpenseBlueprintResponse, TagResponse} from "@/redux/generated/redux-api.ts";
import {TagDialog} from "@/components/tag/TagDialog.tsx";
import {TagTable} from "@/components/tag/TagTable.tsx";

export const App = () => {

    const [isExpenseBlueprintDialogOpen, setIsExpenseBlueprintDialogOpen] = useState(false)
    const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);
    const [expenseBlueprintToEdit, setExpenseBlueprintToEdit] = useState<ExpenseBlueprintResponse>()
    const [tagToEdit, setTagToEdit] = useState<TagResponse>()

    useEffect(() => {
        if (expenseBlueprintToEdit) {
            setIsExpenseBlueprintDialogOpen(true);
        }
    }, [expenseBlueprintToEdit]);

    useEffect(() => {
        if (isExpenseBlueprintDialogOpen) {
            setExpenseBlueprintToEdit(undefined)
        }
    }, [isExpenseBlueprintDialogOpen]);

    useEffect(() => {
        if (tagToEdit) {
            setIsTagDialogOpen(true);
        }
    }, [tagToEdit]);

    useEffect(() => {
        if (isTagDialogOpen) {
            setTagToEdit(undefined)
        }
    }, [isTagDialogOpen]);

    return (
        <VStack>
            <HStack>
                <Heading>Sheeeep</Heading>
                <ColorModeButton/>
            </HStack>
            <HStack>
                <ExpenseBlueprintDialog
                    open={isExpenseBlueprintDialogOpen}
                    setOpen={setIsExpenseBlueprintDialogOpen}
                    valueToUpdate={expenseBlueprintToEdit}
                />
                <TagDialog
                    open={isTagDialogOpen}
                    setOpen={setIsTagDialogOpen}
                    valueToUpdate={tagToEdit}
                />
            </HStack>
            <ExpenseBlueprintTable onEdit={setExpenseBlueprintToEdit}/>
            <TagTable onEdit={setTagToEdit}/>
        </VStack>
    );
}

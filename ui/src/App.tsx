import {ColorModeButton} from "@/components/ui/color-mode.tsx";
import {Heading, HStack, VStack} from "@chakra-ui/react";
import {ExpenseBlueprintDialog} from "@/components/dataset/ExpenseBlueprintDialog.tsx";
import {ExpenseBlueprintTable} from "@/components/dataset/ExpenseBlueprintTable.tsx";
import {useEffect, useState} from "react";
import {ExpenseBlueprintResponse} from "@/redux/generated/redux-api.ts";

export const App = () => {

    const [open, setOpen] = useState(false)
    const [valueToEdit, setValueToEdit] = useState<ExpenseBlueprintResponse>()

    useEffect(() => {
        if (valueToEdit) {
            setOpen(true);
        }
    }, [valueToEdit]);

    useEffect(() => {
        if (open) {
            setValueToEdit(undefined)
        }
    }, [open]);

    return (
        <VStack>
            <HStack>
                <Heading>Sheeeep</Heading>
                <ColorModeButton/>
            </HStack>
            <ExpenseBlueprintDialog
                open={open}
                setOpen={setOpen}
                valueToUpdate={valueToEdit}
            />
            <ExpenseBlueprintTable onEdit={setValueToEdit}/>
        </VStack>
    );
}

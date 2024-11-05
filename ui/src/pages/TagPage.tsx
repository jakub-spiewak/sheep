import {useEffect, useState} from "react";
import {TagResponse} from "@/redux/generated/redux-api.ts";
import {TagDialog} from "@/components/tag/TagDialog.tsx";
import {TagTable} from "@/components/tag/TagTable.tsx";
import {VStack} from "@chakra-ui/react";

export const TagPage = () => {

    const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);
    const [tagToEdit, setTagToEdit] = useState<TagResponse>()

    useEffect(() => {
        if (tagToEdit) {
            setIsTagDialogOpen(true);
        }
    }, [tagToEdit]);

    useEffect(() => {
        if (!isTagDialogOpen) {
            setTagToEdit(undefined)
        }
    }, [isTagDialogOpen]);

    return (
        <VStack gap={4} >
            <TagTable onEdit={setTagToEdit}/>
            <TagDialog
                open={isTagDialogOpen}
                setOpen={setIsTagDialogOpen}
                valueToUpdate={tagToEdit}
            />
        </VStack>
    )

}
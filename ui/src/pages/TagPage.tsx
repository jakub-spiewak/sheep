import {useEffect, useState} from "react";
import {TagResponse} from "@/redux/generated/redux-api.ts";
import {TagDialog} from "@/components/tag/TagDialog.tsx";
import {TagTable} from "@/components/tag/TagTable.tsx";

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
        <>
            <TagDialog
                open={isTagDialogOpen}
                setOpen={setIsTagDialogOpen}
                valueToUpdate={tagToEdit}
            />
            <TagTable onEdit={setTagToEdit}/>
        </>
    )

}
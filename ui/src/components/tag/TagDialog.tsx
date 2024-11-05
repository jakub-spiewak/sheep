import {
    DialogActionTrigger,
    DialogBackdrop,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog.tsx"
import {Button} from "@/components/ui/button.tsx";
import {Input, Stack,} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {isNullOrEmpty} from "@/util/functions.ts";
import {
    TagCreateRequest,
    TagUpdateRequest,
    useCreateTagMutation,
    useUpdateTagMutation,
} from "@/redux/generated/redux-api.ts";
import {useEffect} from "react";
import {Field} from "@/components/ui/field.tsx";

const defaultValues: TagCreateRequest = {
    name: '',
};

interface TagDialogProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    valueToUpdate?: TagUpdateRequest & { id: string };
}

// TODO: zod validation
export const TagDialog = (props: TagDialogProps) => {
    const {open, setOpen, valueToUpdate} = props
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<TagCreateRequest>({
        // resolver: zodResolver(newDataSchemaSchema),
        resetOptions: {
            keepDirtyValues: false
        },
        defaultValues
    });

    const [createTag, createTagResult] = useCreateTagMutation()
    const [updateTag, updateTagResult] = useUpdateTagMutation()

    useEffect(() => {
        const {isSuccess, reset} = createTagResult
        if (isSuccess) {
            setOpen(false);
            reset()
        }
    }, [createTagResult, setOpen]);

    useEffect(() => {
        const {isSuccess, reset} = updateTagResult
        if (isSuccess) {
            setOpen(false);
            reset()
        }
    }, [updateTagResult, setOpen]);


    useEffect(() => {
        if (valueToUpdate) {
            reset(valueToUpdate);
        }
    }, [valueToUpdate, reset]);

    useEffect(() => {
        if (!open) {
            reset(defaultValues);
        }
    }, [open, reset]);

    const onSubmit = (data: TagCreateRequest) => {
        if (valueToUpdate) {
            updateTag({tagUpdateRequest: data, tagId: valueToUpdate.id})
        } else {
            createTag({tagCreateRequest: data})
        }
    }

    return (
        <DialogRoot
            scrollBehavior={'inside'}
            size={'lg'}
            open={open}
            onOpenChange={(e) => {
                if (!e.open) {
                    reset()
                }
                setOpen(e.open)
            }}
        >
            <DialogBackdrop/>
            <DialogTrigger asChild>
                <Button marginRight="auto">
                    Create tag
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogCloseTrigger/>
                <DialogHeader>
                    <DialogTitle>Create tag</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <form id={"main_form"} onSubmit={handleSubmit(onSubmit)}>
                        <Stack gap={4}>
                            <Field label={"Name"}>
                                <Input {...register('name')}/>
                            </Field>
                        </Stack>
                    </form>
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogActionTrigger>
                    <Button
                        type={"submit"}
                        form={"main_form"}
                        disabled={!isNullOrEmpty(errors)}
                        loading={createTagResult.isLoading || updateTagResult.isLoading}
                    >
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    )
}

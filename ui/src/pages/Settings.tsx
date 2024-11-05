import {ActionBarContent, ActionBarRoot, ActionBarSeparator} from "@/components/ui/action-bar.tsx";
import {Button} from "@chakra-ui/react";
import {ColorModeButton} from "@/components/ui/color-mode.tsx";
import {
    DrawerActionTrigger,
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerRoot,
    DrawerTitle
} from "@/components/ui/drawer.tsx";
import {useState} from "react";
import {TagPage} from "@/pages/TagPage.tsx";

export const Settings = () => {
    const [open, setOpen] = useState(false);
    return (
        <ActionBarRoot open={true}>
            <ActionBarContent>
                <ColorModeButton/>
                <ActionBarSeparator/>
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setOpen(true)}
                >
                    Settings
                </Button>
                <DrawerRoot
                    contained
                    open={open}
                    onOpenChange={details => setOpen(details.open)}
                >
                    <DrawerBackdrop  />
                    <DrawerContent
                        offset="4"
                        rounded="md"
                    >
                        <DrawerHeader>
                            <DrawerTitle>
                                Settings
                            </DrawerTitle>
                        </DrawerHeader>
                        <DrawerBody>
                            <TagPage/>
                        </DrawerBody>
                        <DrawerFooter>
                            <DrawerActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </DrawerActionTrigger>
                        </DrawerFooter>
                        <DrawerCloseTrigger/>
                    </DrawerContent>
                </DrawerRoot>
            </ActionBarContent>
        </ActionBarRoot>

    )
}
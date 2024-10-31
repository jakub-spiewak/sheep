import {ColorModeButton} from "@/components/ui/color-mode.tsx";
import {Center, Heading, HStack, VStack} from "@chakra-ui/react";
import {NewExpenseBlueprintDialog} from "@/components/dataset/NewExpenseBlueprintDialog.tsx";

export const App = () => {
    return (
        <>
            <Center>
                <VStack>
                    <HStack>
                        <Heading>Sheeeep</Heading>
                        <ColorModeButton/>
                    </HStack>
                    <NewExpenseBlueprintDialog/>
                </VStack>
            </Center>
        </>
    );
}

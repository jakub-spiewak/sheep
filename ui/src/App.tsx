import {ColorModeButton} from "@/components/ui/color-mode.tsx";
import {Center, Heading, HStack, Tabs, VStack} from "@chakra-ui/react";
import {TbPigMoney, TbTags} from "react-icons/tb";
import {ExpenseBlueprintPage} from "@/pages/ExpenseBlueprintPage.tsx";
import {TagPage} from "@/pages/TagPage.tsx";

export const App = () => {


    return (
        <VStack w={'full'} h={'full'}>
            <HStack>
                <Heading>Sheeeep</Heading>
                <ColorModeButton/>
            </HStack>
            <Center w={'full'}>
                <Tabs.Root defaultValue={"expense-blueprint"}>
                    <Tabs.List>
                        <Tabs.Trigger value={"expense-blueprint"}>
                            <TbPigMoney/>
                            Expense blueprint
                        </Tabs.Trigger>
                        <Tabs.Trigger value={"tags"}>
                            <TbTags/>
                            Tags
                        </Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value={"expense-blueprint"}>
                        <ExpenseBlueprintPage/>
                    </Tabs.Content>
                    <Tabs.Content value={"tags"}>
                        <TagPage/>
                    </Tabs.Content>
                </Tabs.Root>
            </Center>
        </VStack>
    );
}

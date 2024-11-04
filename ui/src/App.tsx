import {Center, Container, Tabs} from "@chakra-ui/react";
import {TbTags} from "react-icons/tb";
import {ExpenseBlueprintPage} from "@/pages/ExpenseBlueprintPage.tsx";
import {TagPage} from "@/pages/TagPage.tsx";
import {GiPayMoney, GiReceiveMoney} from "react-icons/gi";
import {IncomeBlueprintPage} from "@/pages/IncomeBlueprintPage.tsx";
import {BlueprintSummary} from "@/components/expense/blueprint/BlueprintSummary.tsx";

export const App = () => {


    return (
        <Container>
            <BlueprintSummary/>
            <Center w={'full'}>
                <Tabs.Root defaultValue={"expense-blueprint"} w={'full'}>
                    <Tabs.List>
                        <Tabs.Trigger value={"expense-blueprint"}>
                            <GiPayMoney/>
                            Expense blueprint
                        </Tabs.Trigger>
                        <Tabs.Trigger value={"income-blueprint"}>
                            <GiReceiveMoney/>
                            Income blueprint
                        </Tabs.Trigger>
                        <Tabs.Trigger value={"tags"}>
                            <TbTags/>
                            Tags
                        </Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value={"expense-blueprint"}>
                        <ExpenseBlueprintPage/>
                    </Tabs.Content>
                    <Tabs.Content value={"income-blueprint"}>
                        <IncomeBlueprintPage/>
                    </Tabs.Content>
                    <Tabs.Content value={"tags"}>
                        <TagPage/>
                    </Tabs.Content>
                </Tabs.Root>
            </Center>
        </Container>
    );
}

import {Center, Container, Tabs} from "@chakra-ui/react";
import {ExpenseSchedulePage} from "@/pages/ExpenseSchedulePage.tsx";
import {GiPayMoney, GiReceiveMoney, GiTakeMyMoney} from "react-icons/gi";
import {IncomeBlueprintPage} from "@/pages/IncomeBlueprintPage.tsx";
import {BlueprintSummary} from "@/components/expense/blueprint/BlueprintSummary.tsx";
import {Settings} from "@/pages/Settings.tsx";
import {ExpenseEntryPage} from "@/pages/ExpenseEntryPage.tsx";

export const App = () => {


    return (
        <Container>
            <Settings/>
            <BlueprintSummary/>
            <Center w={'full'}>
                <Tabs.Root
                    defaultValue={"expense-schedule"}
                    w={'full'}
                    lazyMount
                    unmountOnExit
                >
                    <Tabs.List>
                        <Tabs.Trigger value={"expense-schedule"}>
                            <GiPayMoney/>
                            Expense blueprint
                        </Tabs.Trigger>
                        <Tabs.Trigger value={"expense-entry"}>
                            <GiTakeMyMoney/>
                            Expense entries
                        </Tabs.Trigger>
                        <Tabs.Trigger value={"income-blueprint"}>
                            <GiReceiveMoney/>
                            Income blueprint
                        </Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value={"expense-schedule"}>
                        <ExpenseSchedulePage/>
                    </Tabs.Content>
                    <Tabs.Content value={"expense-entry"}>
                        <ExpenseEntryPage/>
                    </Tabs.Content>
                    <Tabs.Content value={"income-blueprint"}>
                        <IncomeBlueprintPage/>
                    </Tabs.Content>
                </Tabs.Root>
            </Center>
        </Container>
    );
}

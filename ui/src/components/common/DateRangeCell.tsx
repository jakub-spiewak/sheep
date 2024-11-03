import {Grid, GridItem, Text} from "@chakra-ui/react";
import {IoIosInfinite} from "react-icons/io";

interface DateRangeCellProps {
    from?: string | null,
    to?: string | null,
}

interface HasChildrenProps {
    children?: string | null;
}

const TitleItem = ({children}: HasChildrenProps) => {
    return (
        <GridItem><Text fontWeight={'bold'}>{children}</Text></GridItem>
    )
}

const DateItem = ({children}: HasChildrenProps) => {
    return (
        <GridItem textWrap={'nowrap'}>
            {
                children
                    ?
                    new Date(children).toLocaleDateString()
                    :
                    <IoIosInfinite/>
            }
        </GridItem>
    )
}

export const DateRangeCell = (props: DateRangeCellProps) => {
    const {to, from} = props
    return (
        <Grid
            gap={2}
            templateColumns={"repeat(2, 1fr)"}
            w={'min-content'}
        >
            <TitleItem>From:</TitleItem>
            <DateItem>{from}</DateItem>
            <TitleItem>To:</TitleItem>
            <DateItem>{to}</DateItem>
        </Grid>
    )
}
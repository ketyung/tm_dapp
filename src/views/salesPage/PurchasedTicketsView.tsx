import { Button, Tooltip } from "antd";
import { FC, useEffect, useCallback, useState } from "react";
import useUsersContractState from "../../hooks/useUsersContractState";
import { ShopOutlined } from "@ant-design/icons";
import { TicketsView } from "./TicketsView";
import { Collection } from "../../models";

type Props = {
    collection? : Collection,

    backgroundColor? : string,
}


export const PurchasedTicketsView : FC <Props> = ({
    collection, backgroundColor
}) =>{

    const {getMintedTicketsIn} = useUsersContractState();

    const [tickets, setTickets] = useState<any[]>();

    const fetchTickets = useCallback(async ()=>{
        if ( collection) {
            let t = await getMintedTicketsIn(collection);
            setTickets(t);
        }
    },[collection]);

    useEffect(()=>{
        fetchTickets();
    },[]);

    return <>
    {(tickets && tickets.length > 0) && 
   
   <Tooltip title={<TicketsView tickets={tickets}/>} color={backgroundColor ?? "#223335"}>
    <Button className="PurchasedButton">
    <ShopOutlined style={{marginRight:"6px"}}/>
    Your Purchased Tickets {tickets.length > 0 && 
    <span className="TicketCount">{tickets?.length}</span>}</Button>
    </Tooltip> }
    </>
}
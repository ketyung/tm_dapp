import { Button } from "antd";
import { FC, useEffect, useCallback, useState } from "react";
import useUsersContractState from "../../hooks/useUsersContractState";
import { ShopOutlined } from "@ant-design/icons";
import { Collection } from "../../models";

type Props = {

    collection? : Collection,
}


export const PurchasedTicketsView : FC <Props> = ({
    collection
}) =>{

    const {getMintedTicketsIn} = useUsersContractState();

    const [tickets, setTickets] = useState<any[]>();

    const fetchTickets = useCallback(async ()=>{
        if ( collection) {
            let t = await getMintedTicketsIn(collection);
            setTickets(t);
            console.log("t::", t , new Date());
        }
        else {
            console.error("null.collec", collection, new Date());
        }
    },[collection]);

    useEffect(()=>{
        fetchTickets();
    },[]);

    return <>
    {(tickets && tickets.length > 0) && 
    <Button shape="round"><ShopOutlined style={{marginRight:"6px"}}/>
    Your Purchased Tickets</Button> }
    </>
}
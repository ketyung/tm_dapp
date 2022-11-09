import { Button, Popover } from "antd";
import { FC, useEffect, useCallback, useState } from "react";
import useUsersContractState from "../../hooks/useUsersContractState";
import { ShopOutlined } from "@ant-design/icons";
import { TicketsView } from "./TicketsView";
import { Collection } from "../../models";

type Props = {

    collection? : Collection,
}


export const PurchasedTicketsView : FC <Props> = ({
    collection
}) =>{


    const [open, setOpen] = useState(false);

    const handleOpenChange = (newOpen : boolean) => {
        setOpen(newOpen);
    };

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
    <Popover content={<TicketsView tickets={tickets}/>}
    title={<span style={{color:"white"}}>Your Purchased Tickets</span>}
    trigger="click" style={{ borderRadius:"20px"}}
    open={open} overlayStyle={{
        width: "50vw",
        background:"transparent",
    }} 
    onOpenChange={handleOpenChange}>
  
    <Button className="PurchasedButton">
    <ShopOutlined style={{marginRight:"6px"}}/>
    Your Purchased Tickets {tickets.length > 0 && 
    <span className="TicketCount">{tickets?.length}</span>}</Button>
    </Popover> }
    </>
}
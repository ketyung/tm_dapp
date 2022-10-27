import { useState } from "react";
import useWalletState from "./useWalletState";
import { Collection } from "../../../models";
import { TicketMintsContract } from "../../../near/TicketMintsContract";
import { TICKET_MINTS_CONTRACT_ID } from "../../../near/const";

export default function useTicketMintsContract() {

    const [loading, setLoading] = useState(false);

    const {wallet}  = useWalletState();
    

    const getTicketMintsOf = async (
        title : string, symbol : string, 
        offset : number, limit: number = 20) : Promise<Collection[]>=> {
        setLoading(true);

        let contract = new TicketMintsContract ( TICKET_MINTS_CONTRACT_ID, wallet);

        let colls =  await contract.getTicketMintsOf(title, symbol, offset, limit);
        setLoading(false);
        return colls;
    } 

    return {getTicketMintsOf, loading} as const;
}
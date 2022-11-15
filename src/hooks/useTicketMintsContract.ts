import { useState } from "react";
import useWalletState from "./useWalletState";
import {TicketMint} from "../models";
import { getDatesDaysAgoTillNow, getMinAndMaxTimes, randomInt } from "../utils";
import { TicketMintsContract } from "../near/TicketMintsContract";
import { TICKET_MINTS_CONTRACT_ID } from "../near/const";

export default function useTicketMintsContract() {

    const [loading, setLoading] = useState(false);

    const {wallet}  = useWalletState();
    

    const getTicketMintsOf = async (
        title : string, symbol : string, 
        offset : number, limit: number = 20) : Promise<TicketMint[]>=> {
        setLoading(true);

        let contract = new TicketMintsContract ( TICKET_MINTS_CONTRACT_ID, wallet);

        let tms =  await contract.getTicketMintsOf(title, symbol, offset, limit);
        setLoading(false);
        return tms;
    } 

    const getTicketMintsBy = async (offset : number, limit: number = 20) : Promise<TicketMint[]>=> {
        setLoading(true);

        let contract = new TicketMintsContract ( TICKET_MINTS_CONTRACT_ID, wallet);

        let tms =  await contract.getTicketMintsBy( offset, limit);
        setLoading(false);
        return tms;
    } 


    const getSalesCountInRange = async (numberOfDaysAgo : number = 5) : Promise<{date : string, value : string}[]>=>{

        let range = getDatesDaysAgoTillNow(numberOfDaysAgo);

        let contract = new TicketMintsContract ( TICKET_MINTS_CONTRACT_ID, wallet);

        let data : {date : string, value : string}[] = [];
        range.forEach(async (d) =>{

            let mts = getMinAndMaxTimes(d);
            let cnt = await contract.getTicketMintsCount(mts[0], mts[1]);
            data.push({date : d.toDateString(), value : `${cnt}`});

        });

        return data;

    }

    return {getTicketMintsOf, loading, getTicketMintsBy, getSalesCountInRange} as const;
}
import { useState } from "react";
import useWalletState from "./useWalletState";
import {TicketMint, BuyerResult} from "../models";
import { getDatesDaysAgoTillNow, getMinAndMaxTimes, shortDate} from "../utils";
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


    const getSalesCountInRange = async (numberOfDaysAgo : number = 7) : 
    Promise<{date? : string, count : number }[]>=>{

        let range = getDatesDaysAgoTillNow(numberOfDaysAgo);

        let contract = new TicketMintsContract ( TICKET_MINTS_CONTRACT_ID, wallet);

        let data : {date? : string, count : number}[] = [];
        let dateRanges : {date? : string, 
            start_date_timestamp? : number, end_date_timestamp? : number }[] = [];

        range.forEach(async (d) =>{

            let mts = getMinAndMaxTimes(d);
            dateRanges.push({date : shortDate(d), start_date_timestamp :
            mts[0], end_date_timestamp : mts[1]});
           
        });

        data = await contract.getTicketMintsCountFor(dateRanges);
          

        return data;

    }

    const getTicketsBuyers = async ( offset? : number, limit : number = 10) : Promise<BuyerResult> =>{

        setLoading(true);
        let contract = new TicketMintsContract ( TICKET_MINTS_CONTRACT_ID, wallet);

        let buyers =  await contract.getTicketsBuyers( offset, limit);
        setLoading(false);
        return buyers;
    }

    return {getTicketMintsOf, loading, getTicketMintsBy, getSalesCountInRange, getTicketsBuyers} as const;
}
import { FC, useState, useCallback, useEffect } from "react";
import useTicketMintsContract from "../../hooks/useTicketMintsContract";
import { Buyer } from "../../models";
import { ListRow } from "./ListRow";
import { GSpinner } from "../components/GSpinner";
import './css/List.css';

export const List : FC  = () =>{

    const {getTicketsBuyers, loading} = useTicketMintsContract();

    const [buyers, setBuyers] = useState<Buyer[]>();

    const loadBuyers = useCallback(async ()=>{

        let b = await getTicketsBuyers(0);
        setBuyers(b.buyers);
        
    },[getTicketsBuyers]);

    useEffect(()=>{
        loadBuyers();
    },[]);

   

    return <div className="BuyerListDiv">
        <table className="BuyerList" cellPadding={3} cellSpacing={3}>
        <thead>
            <tr>
                <th style={{width:"5%"}}>
                No.
                </th>
                <th style={{width:"24%",textAlign:"justify"}}>
                Wallet
                </th>
                <th style={{width:"30%", textAlign:"justify"}}>
                Name
                </th>
                <th style={{width:"10%"}}>
                Last Purchase Date
                </th>
            </tr>
        </thead>
        <tbody>
        {
            buyers?.map((b,i)=>{
                return <ListRow key={"BuyerListRow"+i} buyer={b} index={i}/>;
            })
        }
        { loading && <tr><td colSpan={4} style={{width:"100%"}}><GSpinner text="Loading..."/></td></tr>}
        </tbody>

    </table></div>
}
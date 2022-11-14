import { FC, useState, useEffect, useCallback } from "react";
import { MintsListRow } from "./MintsListRow";
import { GSpinner } from "../components/GSpinner";
import { Page } from "../../models";
import usePage from "../../hooks/usePage";
import { LeftCircleOutlined } from "@ant-design/icons";
import useTicketMintsContract from "../../hooks/useTicketMintsContract";
import { TicketMint } from "../../models";
import './css/MintsList.css';

type Props = {

    title? : string,

    symbol? : string, 
}

export const MintsList : FC <Props> = ({
    title, symbol
}) =>{

    const {getTicketMintsOf, loading, getTicketMintsBy} = useTicketMintsContract();

    const [ticketMints, setTicketMints] = useState<TicketMint[]>();

    const {setPage} = usePage();

    const loadTicketMints = useCallback(async ()=>{

        let tms : TicketMint[]|undefined= undefined;

        if (title && symbol){

            tms = await getTicketMintsOf(title, symbol, 0);
        }
        else {

            tms = await getTicketMintsBy(0);
        }
        
        setTicketMints(tms);

    },[getTicketMintsOf]);

    useEffect(()=>{
        loadTicketMints();
    },[]);

    return <div className="MintsListDiv">
        <LeftCircleOutlined style={{float:"left",marginLeft:"14px",clear:"both"}} onClick={()=>{
                    setPage(Page.Home);}}/>
        <table className="MintsList" cellPadding={3} cellSpacing={3}>
        <thead>
            <tr style={{borderBottom:"1px solid #bbb"}}>
                <th style={{textAlign:"center"}} colSpan={5}>
                {title ? `Ticket Sales Of ${title} (${symbol})` : "Recent Ticket Sales"}
                </th>
            </tr>
            <tr>
                <th style={{width:"5%"}}>
                No.
                </th>
                <th style={{width:"20%"}}>
                Ticket No
                </th>
                <th style={{width:"30%"}}>
                Purchased By
                </th>
                <th style={{width:"10%"}}>
                Price (NEAR)
                </th>
                <th style={{width:"10%"}}>
                Date
                </th>
            </tr>
        </thead>
        <tbody>
        {
            ticketMints?.map((t,i)=>{
                return <MintsListRow key={"MListRow"+i} ticketMint={t} index={i}
                showTooltipOfCollection={title===undefined}/>;
            })
        }
        { loading && <tr><td colSpan={6} style={{width:"100%"}}><GSpinner text="Loading..."/></td></tr>}
        { (ticketMints !== undefined && ticketMints.length ===0 ) && <tr><td colSpan={6} style={{width:"100%"}}>
            No Ticket Sales Found</td></tr>}
        </tbody>
    </table></div>
}
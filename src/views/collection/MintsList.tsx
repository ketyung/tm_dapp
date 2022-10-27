import { FC, useState, useEffect, useCallback } from "react";
import { MintsListRow } from "./MintsListRow";
import { GSpinner } from "../components/GSpinner";
import { Page } from "../../models";
import usePage from "../../utils/sm/hooks/usePage";
import { LeftCircleOutlined } from "@ant-design/icons";
import useTicketMintsContract from "../../utils/sm/hooks/useTicketMintsContract";
import { TicketMint } from "../../models";
import './css/MintsList.css';

type Props = {

    title : string,

    symbol : string, 
}

export const MintsList : FC <Props> = ({
    title, symbol
}) =>{

    const {getTicketMintsOf, loading} = useTicketMintsContract();

    const [ticketMints, setTicketMints] = useState<TicketMint[]>();

    const {setPage} = usePage();

    const loadTicketMints = useCallback(async ()=>{

        let tms = await getTicketMintsOf(title, symbol, 0);
        
        setTicketMints(tms);

    },[getTicketMintsOf]);

    useEffect(()=>{
        loadTicketMints();
    },[]);

    return <table className="MintsList" cellPadding={3} cellSpacing={3}>
        <thead>
            <tr style={{borderBottom:"1px solid #999"}}>
                <td><LeftCircleOutlined onClick={()=>{
                    setPage(Page.Home);
                }}/></td>
                <td style={{textAlign:"center"}} colSpan={4}>
                Ticket Sales Of {title} ({symbol})
                </td>
            </tr>
            <tr>
                <td style={{width:"5%"}}>
                No.
                </td>
                <td style={{width:"20%"}}>
                Ticket No
                </td>
                <td style={{width:"30%"}}>
                Purchased By
                </td>
                <td style={{width:"10%"}}>
                Price
                </td>
                <td style={{width:"10%"}}>
                Date
                </td>
            </tr>
        </thead>
        <tbody>
        {
            ticketMints?.map((t,i)=>{
                return <MintsListRow key={"MListRow"+i} ticketMint={t} index={i}/>;
            })
        }
        { loading && <tr><td colSpan={6} style={{width:"100%"}}><GSpinner text="Loading..."/></td></tr>}
        { (ticketMints !== undefined && ticketMints.length ===0 ) && <tr><td colSpan={6} style={{width:"100%"}}>
            No Ticket Sales Found</td></tr>}
        </tbody>
    </table>
}
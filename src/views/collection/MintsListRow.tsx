import { TicketMint, TicketAttributeType } from "../../models";
import { dateToTimeAgo, yoctoToNear, nearTimestampToDate } from "../../utils";

import { FC } from "react";

type Props = {

    ticketMint : TicketMint,

    index? : number,
}

export const MintsListRow : FC <Props> = ({
    ticketMint, index,
}) =>{
   

    const price = yoctoToNear(ticketMint.attributes.filter((t)=>{
        return (t.name === TicketAttributeType.Price);
    })[0]?.value ?? "0", 3) ;

    const ticketType = ticketMint.attributes.filter((t)=>{
        return (t.name === TicketAttributeType.TicketType);
    })[0]?.value ?? "" ;


    return <tr key={"_row"+(index)}>
        <td style={{width:"5%"}}>
        {((index ?? 0)+1)}.
        </td>
        <td style={{width:"20%"}}>
        {ticketMint.token_id}
        </td>
        <td style={{width:"30%",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
        {ticketMint.mint_by}
        </td>
        <td style={{width:"10%"}} title={ticketType}>
        {price}
        </td>
        <td style={{width:"10%"}} title={nearTimestampToDate(ticketMint.date).toLocaleString()}>
        {dateToTimeAgo( nearTimestampToDate(ticketMint.date)).short}  
        </td>
    </tr>
}
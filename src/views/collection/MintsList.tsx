import { FC } from "react";
import { MintsListRow } from "./MintsListRow";

export const MintsList : FC = () =>{

    return <table className="MintsList" cellPadding={3} cellSpacing={3}>
        <thead>
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

    </table>
}
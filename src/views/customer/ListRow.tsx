import { Buyer} from "../../models";
import useUsersContractState from "../../hooks/useUsersContractState";
import { FC , useEffect, useState, useCallback} from "react";
import { MessageOutlined } from "@ant-design/icons";
import { dateToTimeAgo, nearTimestampToDate } from "../../utils";

type Props = {

    buyer : Buyer,

    index? : number,
};

export const ListRow : FC <Props> = ({
   buyer, index, 
}) =>{

    const [buyerName, setBuyerName] = useState<string>();

    const {getUserBy} = useUsersContractState();

    const getUserName =  useCallback(async ()=>{
        let u = await getUserBy(buyer.account_id ?? "");
        if ( u )
            setBuyerName(`${u?.first_name} ${u?.last_name}`);

    },[getUserBy]);

 
    useEffect(()=>{
        getUserName();
    },[getUserName])

  
  
    return <tr key={"row"+(index)}>
        <td style={{width:"5%"}}>
        {((index ?? 0)+1)}.
        </td>
        <td style={{width:"24%",textAlign:"justify",
        whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:"80px"}}>
        {buyer.account_id}
        </td>
        <td style={{width:"30%", textAlign:"justify"}}>
        {buyerName ? <><MessageOutlined title="Message customer... coming soon..."
        style={{cursor:"pointer",marginRight:"6px"}}/>{buyerName}</> : 
        <span style={{color:"#d00"}}>Not Signed Up</span>}
        </td>
        <td style={{width:"10%"}} title={nearTimestampToDate(buyer.last_puchase_date ?? 0).toLocaleString()}>
        {dateToTimeAgo( nearTimestampToDate(buyer.last_puchase_date ?? 0)).short}  
        </td>
    </tr>
}
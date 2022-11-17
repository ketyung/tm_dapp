import { Buyer} from "../../models";
import useUsersContractState from "../../hooks/useUsersContractState";
import { FC , useEffect, useState, useCallback} from "react";
import { dateToTimeAgo, yoctoToNear, nearTimestampToDate } from "../../utils";

type Props = {

    buyer : Buyer,

    index? : number,
};

export const ListRow : FC <Props> = ({
   buyer, index, 
}) =>{

    const [buyerName, setBuyerName] = useState<string>();

    const {getUser} = useUsersContractState();

    const getUserName =  useCallback(async ()=>{
        let u = await getUser();
        setBuyerName(`${u?.first_name} ${u?.last_name}`);
    },[getUser]);

 
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
        {buyerName}
        </td>
        <td style={{width:"10%"}} title={nearTimestampToDate(buyer.last_puchase_date ?? 0).toLocaleString()}>
        {dateToTimeAgo( nearTimestampToDate(buyer.last_puchase_date ?? 0)).short}  
        </td>
    </tr>
}
import { FC } from "react";
import { CheckCircleFilled, CheckCircleOutlined } from "@ant-design/icons";
import { fromOnchainTicketPrice } from "../../utils";
import { Collection, TicketType } from "../../models";


type Props = {

    collection? : Collection,

    selectedTicketType? : TicketType,

    setSelectedTicketType? : ( t : TicketType) => void, 
}

export const TicketTypesView : FC <Props> = ({
    collection, selectedTicketType, setSelectedTicketType
}) =>{

    return <div className="TicketTypes">
        {

            collection?.ticket_types?.map((t,i) => {
                return <div className="row" key={"tp"+i} 
                    style={{cursor:"pointer"}}
                    onClick={()=>{
                        if ( setSelectedTicketType)
                            setSelectedTicketType(t);
                    }}>
                    <div>{t.ticket_type}</div>
                    <div>{fromOnchainTicketPrice(t.price)} NEAR</div>
                    {(selectedTicketType?.ticket_type ?? "Standard" ) === t.ticket_type ?
                    <CheckCircleFilled/> : 
                    <CheckCircleOutlined/>}
                </div>
            })
        }

    </div>
}
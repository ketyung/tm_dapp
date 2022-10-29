import { FC } from "react";
import { TicketType } from "../../models";
import { FormInput } from "../components/FormInput";
import { PriceTypeColorPicker } from "./PriceTypeColorPicker";
import { CollectionFormProps } from "./Form";


type Props = CollectionFormProps & {index ? : number, ticketType? : TicketType };

export const PriceTypeRow : FC <Props> = ({
    index, collection, setCollection, ticketType

}) =>{

    return <tr key={"ptype"+index}>
    <td valign="top" style={{width:"2%"}}>{(index ?? 0)+1}</td>
    <td valign="top" style={{width:"40%"}}>
        <FormInput style={{maxWidth:"150px"}} 
        formItemStyle={{display:"inline"}}
        value={ticketType?.ticket_type} onChange={(e)=>{
            if ( setCollection && collection && collection.ticket_types && index) {
                let tts = collection.ticket_types;
                tts[index].ticket_type = e.target.value;
                setCollection({...collection, ticket_types: tts });
            }
        }}/>

    </td>
    <td valign="top" style={{width:"20%",textAlign:"left",
    paddingLeft:"12px"}}>
        <FormInput style={{maxWidth:"80px"}} 
        formItemStyle={{display:"inline"}}
        isNumber={true} value={ticketType?.price} onChange={(e)=>{
            if ( setCollection && collection && collection.ticket_types && index) {
                let tts = collection.ticket_types;
                let price = e;

                if (!isNaN(price)) {
               
                    tts[index].price = price;
                    setCollection({...collection, ticket_types: tts });
                   
                }
              
            }
        }}/>
    </td>

    <td valign="top" style={{width:"15%",textAlign:"left",paddingLeft:"30px"}} colSpan={2}>
        <PriceTypeColorPicker selectedColorCode={
           (collection && collection.ticket_types && index) ? 
           collection.ticket_types[index].color_code : "#34b"
        } setSelectedColorCode ={(c)=>{
            
            if ( setCollection && collection && collection.ticket_types && index) {
                let tts = collection.ticket_types;
                tts[index].color_code = c;
                setCollection({...collection, ticket_types: tts });
            }
        }}/>
    </td>
    </tr>;

}
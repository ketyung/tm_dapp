import { DEFAULT_COLOR_CODE } from "./PriceTypesForm";
import { FC, useEffect } from "react";
import { TicketType } from "../../models";
import { FormInput } from "../components/FormInput";
import { EyeOutlined } from "@ant-design/icons";
import { PriceTypeColorPicker } from "./PriceTypeColorPicker";
import { fromOnchainTicketPrice } from "../../utils";
import { CollectionFormProps } from "./Form";


type Props = CollectionFormProps & {index ? : number, ticketType? : TicketType,
setSelectedRowForPreview? : (index? : number) => void };

export const PriceTypeRow : FC <Props> = ({
    index, collection, setCollection, ticketType, setSelectedRowForPreview, isEditMode
}) =>{


    useEffect(()=>{

        if ( isEditMode ){

            if ( setCollection && collection && collection.ticket_types && index!== undefined) {
                let tts = collection.ticket_types;
                tts[index].price = parseFloat(fromOnchainTicketPrice(tts[index].price));
                setCollection({...collection, ticket_types: tts });
            }
        }
    },[]);


    return <tr key={"ptype"+index}>
    <td style={{width:"2%"}}>{(index ?? 0)+1}</td>
    <td style={{width:"40%"}}>
        <FormInput style={{maxWidth:"150px"}} 
        formItemStyle={{display:"inline"}}
        value={ticketType?.ticket_type} onChange={(e)=>{
            if ( setCollection && collection && collection.ticket_types && index!== undefined) {
                let tts = collection.ticket_types;
                tts[index].ticket_type = e.target.value;
                setCollection({...collection, ticket_types: tts });
            }
        }}/>

    </td>
    <td style={{width:"20%",textAlign:"left",
    paddingLeft:"12px"}}>
        <FormInput style={{maxWidth:"80px"}} 
        formItemStyle={{display:"inline"}}
        isNumber={true} value={  ticketType?.price } onChange={(e)=>{
            if ( setCollection && collection && collection.ticket_types && index!==undefined) {
                let tts = collection.ticket_types;
                let price = e;

                if (!isNaN(price)) {
               
                    tts[index].price = price;
                    setCollection({...collection, ticket_types: tts });
                   
                }
              
            }
        }}/>
    </td>

    <td style={{width:"15%"}}>
        <PriceTypeColorPicker selectedColorCode={
           (collection && collection.ticket_types && index!==undefined) ? 
           collection.ticket_types[index].color_code : DEFAULT_COLOR_CODE
        } setSelectedColorCode ={(c)=>{
            
            if ( setCollection && collection && collection.ticket_types && index!==undefined) {
                let tts = collection.ticket_types;
                tts[index].color_code = c;
                setCollection({...collection, ticket_types: tts });
            }
        }}/>
    </td>
    <td style={{width:"10%"}}>
        <EyeOutlined title="Preview" 
        style={{width:"50px",cursor:"pointer"}}
        onClick={()=>{
            if (setSelectedRowForPreview)
                setSelectedRowForPreview(index);
        }}/>
    </td>
    </tr>;

}
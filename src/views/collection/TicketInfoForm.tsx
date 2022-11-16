import { FC } from "react";
import { FormInput } from "../components/FormInput";
import { PriceTypesForm } from "./PriceTypesForm";
import { Checkbox } from "antd";
import { Props } from "./EventTabbedForm";
import { AttributeType } from "../../models";
import { setCollectionAttribute } from "./OtherInfoForm";


export const TicketInfoForm : FC <Props> = ({
    collection, setCollection, setSelectedRowForPreview,isEditMode
}) =>{

    const setCollectionAttrib = (
        attrbType : AttributeType, value : string) =>{

        if ( collection && setCollection){
            
            setCollectionAttribute(attrbType,value,collection, setCollection);
        }
    }


   
    return <table cellPadding={1} cellSpacing={1}>
    <tbody>
    <tr>
        <td style={{width:"50%",textAlign:"left"}}>
        <FormInput style={{width:"80px",marginTop:"10px"}} required={true}
        step={1000} isNumber={true} label={<>Total number of tickets</>} placeholder="1000" 
        min={1} max={50000} value={collection.total_tickets} onChange={(e)=>{
            let v = parseInt(e);
            if ( setCollection && !isNaN(v))
                setCollection({...collection, total_tickets : v});
        }}/>
        </td>
        <td style={{width:"50%",textAlign:"left"}}>
        <FormInput style={{width:"80px",marginTop:"10px"}} 
        formItemStyle={{marginLeft:"30px"}}
        label={<>Ticket Starting Number</>} placeholder="1000" 
        value={collection.attributes?.filter(a =>{
            return a.name === AttributeType.TicketStartingNumber
        })[0]?.value} onChange={(e)=>{

            let n = parseInt(e.target.value);
            if ( !isNaN(n)) {
                let v : string = `${n}` ;
                setCollectionAttribute(AttributeType.TicketStartingNumber,v ,collection, setCollection);
            }
        }}/> 
        </td>
    </tr>
    <tr>
        <td style={{textAlign:"left",width:"50%"}} valign="top">
        <FormInput isNumber={true} style={{maxWidth:"100px"}} 
        label="Max Ticket Per Wallet" min={1} max={10} step={1}
        value  ={ (collection && collection.attributes) ? 
            collection.attributes.filter((e)=>{
                return e.name === AttributeType.MaxTicketPerWallet
            })[0]?.value : 1
        }
        
        onChange={(e)=>{
            setCollectionAttrib(AttributeType.MaxTicketPerWallet, e + "");
        }}
        />
        </td>
        <td style={{textAlign:"left",width:"50%"}} valign="top">
        Buyer is required to sign up? <Checkbox checked={
            collection.attributes?.filter(a => { return a.name === AttributeType.BuyerRequiredToSignUp})[0]?.value 
            === "true"
        } onChange={(e)=>{

            if (e.target.checked) {
                setCollectionAttrib(AttributeType.BuyerRequiredToSignUp,"true");
            }
            else {
                setCollectionAttrib(AttributeType.BuyerRequiredToSignUp,"false");
            }
        }}/>
        </td>
    </tr>
    <tr>
        <td valign="top" colSpan={2} style={{width:"100%",paddingTop:"10px"}}>
        <PriceTypesForm collection={collection} setCollection={setCollection}
        setSelectedRowForPreview={setSelectedRowForPreview} isEditMode={isEditMode}/>
        </td>
    </tr>
    </tbody>
    </table>
}
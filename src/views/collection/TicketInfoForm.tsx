import { FC } from "react";
import { FormInput } from "../components/FormInput";
import { PriceTypesForm } from "./PriceTypesForm";
import { Form } from "antd";
import { Props } from "./EventTabbedForm";
import { AttributeType } from "../../models";
import { setCollectionAttribute } from "./OtherInfoForm";


export const TicketInfoForm : FC <Props> = ({
    collection, setCollection, setSelectedRowForPreview,isEditMode
}) =>{


    const formItemLayout = {
        labelCol: {
           span : 2.3,
        },
    };

    return <Form {...formItemLayout}><table cellPadding={1} cellSpacing={1}>
    <tbody>
    <tr>
    <td valign="top" colSpan={2} style={{width:"100%",textAlign:"left"}}>
        <FormInput style={{width:"80px",marginTop:"10px"}} required={true}
        formItemStyle={{display:"inline-block"}}
        step={1000} isNumber={true} label={<>Total number of tickets</>} placeholder="1000" 
        min={1} max={50000} value={collection.total_tickets} onChange={(e)=>{
            let v = parseInt(e);
            if ( setCollection && !isNaN(v))
                setCollection({...collection, total_tickets : v});
        }}/>
        { <FormInput style={{width:"80px",marginTop:"10px"}} 
        formItemStyle={{marginLeft:"30px",display:"inline-block"}}
        label={<>Ticket Starting Number</>} placeholder="1000" 
        value={collection.attributes?.filter(a =>{
            return a.name === AttributeType.TicketStartingNumber
        })[0]?.value} onChange={(e)=>{

            let n = parseInt(e.target.value);
            if ( !isNaN(n)) {
                let v : string = `${n}` ;
                setCollectionAttribute(AttributeType.TicketStartingNumber,v ,collection, setCollection);
            }
        }}/> }

        </td>
    </tr>
    <tr>
        <td valign="top" colSpan={2} style={{width:"100%"}}>
        <PriceTypesForm collection={collection} setCollection={setCollection}
        setSelectedRowForPreview={setSelectedRowForPreview} isEditMode={isEditMode}/>
        </td>
    </tr>
    </tbody>
    </table></Form>
}
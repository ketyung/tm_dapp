import { FC } from "react";
import { CollectionFormProps } from "./Form";
import { PriceTypesForm } from "./PriceTypesForm";
import { OtherInfoForm } from "./OtherInfoForm";
import { CategoriesSelect } from "./CategoriesSelect";
import { StatusSelect } from "./StatusSelect";
import { FormInput } from "../components/FormInput";
import { setCollectionAttribute } from "./OtherInfoForm";
import { FormTextArea } from "../components/FormTextArea";
import { LinksForm } from "./LinksForm";
import { Form } from "antd";
import { acronym } from "../../utils";
import { AttributeType } from "../../models";

type Props = CollectionFormProps & {
    setSelectedRowForPreview? : (index? : number) => void };


export const InfoForm : FC <Props> = ({
    collection, setCollection, setSelectedRowForPreview,isEditMode
}) =>{

    const formItemLayout = {
        labelCol: {
           span : 2.3,
        },
    };


    return  <Form {...formItemLayout}><table cellPadding={1} cellSpacing={1}>
    <tbody>
        <tr>
            <td valign="top" style={{width:"65%"}}>
            <FormInput label="Event/Title" style={{minWidth:"180px"}} 
            value={collection?.title} required={true} readOnly={isEditMode}
            onChange={(e)=>{
                let title = e.target.value
                let a = acronym(title);
                if ( setCollection) {
                    if ( a )
                        setCollection({...collection, symbol: a, title: title });
                    else 
                        setCollection({...collection, title: title});
                }
            }}/>
            </td>
            <td valign="top" style={{width:"35%"}}>
            <FormInput label="Symbol" style={{maxWidth:"100px"}} readOnly={true} value={collection?.symbol ?? ""}/>
            </td>
        </tr>
        <tr>
            <td valign="top" style={{width:"100%",textAlign:"left"}} colSpan={2}>
            <FormTextArea style={{maxWidth:"480px",marginTop:"10px"}} rows={2} 
            minRows={2} maxRows={5}
            label="Description" 
            value={collection.description} onChange={(e)=>{
                if ( setCollection)
                    setCollection({...collection, description : e.currentTarget.value})
            }}/>
            </td>
        </tr>
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
            <td valign="top" style={{width:"65%",textAlign:"left"}}>
                <CategoriesSelect collection={collection} setCollection={setCollection}/>
            </td>
            <td valign="top" style={{width:"35%",textAlign:"left"}}>
                <StatusSelect collection={collection} setCollection={setCollection} isEditMode={isEditMode}/>
            </td>
        </tr>
        <tr>
            <td valign="top" colSpan={2} style={{width:"100%"}}>
            <PriceTypesForm collection={collection} setCollection={setCollection}
            setSelectedRowForPreview={setSelectedRowForPreview} isEditMode={isEditMode}/>
            </td>
        </tr>
        <tr>
            <td valign="top" colSpan={2} style={{width:"100%"}}>
            <OtherInfoForm collection={collection} setCollection={setCollection} isEditMode={isEditMode}/>
            </td>
        </tr>
        <tr>
            <td valign="top" colSpan={2} style={{width:"100%"}}>
            <LinksForm collection={collection} setCollection={setCollection}/>
            </td>
        </tr>
   

    </tbody>
</table>
</Form>


}

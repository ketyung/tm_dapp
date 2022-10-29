import { FC } from "react";
import { CollectionFormProps } from "./Form";
import { PriceTypesForm } from "./PriceTypesForm";
import { FormInput } from "../components/FormInput";
import { FormTextArea } from "../components/FormTextArea";
import { Form } from "antd";
import { acronym } from "../../utils";

type Props = CollectionFormProps & {
    setSelectedRowForPreview? : (index? : number) => void };


export const InfoForm : FC <Props> = ({
    collection, setCollection, setSelectedRowForPreview
}) =>{

    const formItemLayout = {
        labelCol: {
           span : 2.3,
        },
    };


    return  <Form {...formItemLayout}><table cellPadding={5} cellSpacing={5}>
    <tbody>
        <tr>
            <td valign="top" style={{width:"70%"}}>
            <FormInput label="Event/Title" style={{minWidth:"260px"}} 
            value={collection?.title}
            onChange={(e)=>{
                let title = e.target.value
                let a = acronym(title);
                if ( setCollection) {
                    if ( a )
                        setCollection({...collection, symbol: a, title: title });
                    else 
                        setCollection({...collection, title: title});
                }
    
            }}
                
            />
            </td>
            <td valign="top" style={{width:"30%"}}>
            <FormInput label="Symbol" style={{maxWidth:"100px"}} readOnly={true} value={collection?.symbol ?? ""}/>
            </td>
        </tr>
        <tr>
            <td valign="top" colSpan={2} style={{width:"100%"}}>
            <FormTextArea style={{width:"420px",marginTop:"10px"}} rows={3} 
            minRows={2} maxRows={5}
            label="Description" 
            value={collection.description} onChange={(e)=>{
                if ( setCollection)
                    setCollection({...collection, description : e.currentTarget.value})
            }}/>
            </td>
        </tr>
        <tr>
            <td valign="top" colSpan={2} style={{width:"100%"}}>
            <PriceTypesForm collection={collection} setCollection={setCollection}
            setSelectedRowForPreview={setSelectedRowForPreview}/>
            </td>
        </tr>
    </tbody>
</table>
</Form>


}

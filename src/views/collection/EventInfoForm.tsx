import { FC } from "react";
import { Form } from "antd";
import { CollectionFormProps } from "./Form";
import { FormInput } from "../components/FormInput";
import { FormTextArea } from "../components/FormTextArea";
import { CategoriesSelect } from "./CategoriesSelect";
import { StatusSelect } from "./StatusSelect";
import { acronym } from "../../utils";

export const EventInfoForm : FC <CollectionFormProps>= ({
    collection, setCollection, isEditMode
}) =>{

    const formItemLayout = {
        labelCol: {
           span : 4,
        },
    };


    return <Form {...formItemLayout}><table cellPadding={1} cellSpacing={1}>
    <FormInput label="Symbol" formItemStyle={{display:"none"}} style={{maxWidth:"100px", display:"none"}} 
    readOnly={true} value={collection?.symbol ?? ""}/>
    <tbody>
        <tr>
            <td valign="top" style={{width:"100%",textAlign:"left"}}>
            <FormInput label="Name/Title" style={{maxWidth:"360px"}} 
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
        </tr>
        <tr>
            <td valign="top" style={{width:"100%",textAlign:"left"}}>
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
            <td valign="top" style={{width:"100%",textAlign:"left"}}>
                <CategoriesSelect collection={collection} setCollection={setCollection}/>
            </td>
        </tr>
        <tr>
            <td valign="top" style={{width:"100%",textAlign:"left"}}>
                <StatusSelect collection={collection} setCollection={setCollection} isEditMode={isEditMode}
                style={{maxWidth:"300px"}}/>
            </td>
        </tr>
        </tbody>
        </table>
    </Form>
}

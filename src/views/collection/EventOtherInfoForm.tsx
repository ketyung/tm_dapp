import { FC } from "react";
import { Form } from "antd";
import { OtherInfoForm } from "./OtherInfoForm";
import { LinksForm } from "./LinksForm";
import { CollectionFormProps } from "./Form";


export const EventOtherInfoForm : FC <CollectionFormProps> = ({
    collection, setCollection, isEditMode
}) =>{

    const formItemLayout = {
        labelCol: {
           span : 2.3,
        },
    };

    return <Form {...formItemLayout}><table cellPadding={1} cellSpacing={1}>
    <tbody>
    <tr>
        <td valign="top" style={{width:"100%"}}>
        <OtherInfoForm collection={collection} setCollection={setCollection} isEditMode={isEditMode}/>
        </td>
    </tr>
    <tr>
        <td valign="top" style={{width:"100%"}}>
        <LinksForm collection={collection} setCollection={setCollection}/>
        </td>
    </tr>

    </tbody>
    </table></Form>
}
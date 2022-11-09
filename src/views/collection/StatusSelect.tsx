import { FC } from "react";
import { CollectionFormProps } from "./Form";
import { Select, Form } from "antd";
import { AttributeType } from "../../models";
import { setCollectionAttribute } from "./OtherInfoForm";

const { Option } = Select;

export const StatusSelect : FC <CollectionFormProps> = ({
    collection, setCollection,isEditMode
}) =>{

    const allStatus = isEditMode && 
    collection?.attributes?.filter (a=> {return a.name === AttributeType.Status})[0]?.value !== "N"
    ?
    [{code:"R", text: "Ready For Sale"}, 
    {code:"D", text:"Deactivated"}]
    :
    [{ code:"N", text: "New"}, {code:"R", text: "Ready For Sale"}, 
    {code:"D", text:"Deactivated"}]
    ;

    return <Form.Item label={"Status"} labelAlign={"right"} required={true}>   
    <Select value={collection?.attributes?.filter((a) =>{
       return a.name === AttributeType.Status
    })[0]?.value ?? allStatus[0].code} style={{maxWidth:"320px",textAlign:"left"}}
    onChange={(e)=>{
        setCollectionAttribute(AttributeType.Status,e, collection, setCollection);
    }}>
        {
            allStatus.map((e,i)=>{
                return <Option key={"catOpt"+i} value={e.code}>{e.text}</Option>
            })
        }

    </Select></Form.Item>
}
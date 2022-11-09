import { FC } from "react";
import { CollectionFormProps } from "./Form";
import { Select, Form } from "antd";
import { QuestionCircleTwoTone} from "@ant-design/icons";
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
    })[0]?.value ?? allStatus[0].code} style={{maxWidth:"100px",textAlign:"left",fontSize:"8pt"}}
    onChange={(e)=>{
        setCollectionAttribute(AttributeType.Status,e, collection, setCollection);
    }}>
        {
            allStatus.map((e,i)=>{
                return <Option key={"catOpt"+i} style={{fontSize:"8pt"}} value={e.code}>{e.text}</Option>
            })
        }

    </Select><QuestionCircleTwoTone style={{marginLeft:"6px",cursor:"pointer"}}/></Form.Item>
}
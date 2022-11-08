import { FC } from "react";
import { CollectionFormProps } from "./Form";
import { Select, Form } from "antd";
import { AttributeType } from "../../models";
import { setCollectionAttribute } from "./OtherInfoForm";

const { Option } = Select;

export const StatusSelect : FC <CollectionFormProps> = ({
    collection, setCollection
}) =>{

    const allStatus = ["Draft", "ReadyForSale", "Deactivated"];

    return <Form.Item label={"Status"} labelAlign={"right"} required={true}>   
    <Select value={collection?.attributes?.filter((a) =>{
       return a.name === AttributeType.Status
    })[0]?.value ?? allStatus[0]} style={{maxWidth:"320px",textAlign:"left"}}
    onChange={(e)=>{
        setCollectionAttribute(AttributeType.Status,e, collection, setCollection);
    }}>
        {
            allStatus.map((e,i)=>{
                return <Option key={"catOpt"+i} value={e}>{e}</Option>
            })
        }

    </Select></Form.Item>
}
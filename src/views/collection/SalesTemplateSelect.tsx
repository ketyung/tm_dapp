import { FC } from "react";
import { CollectionFormProps } from "./Form";
import { Select, Form } from "antd";
import { AttributeType } from "../../models";
import { setCollectionAttribute } from "./OtherInfoForm";

const { Option } = Select;

export const SalesTemplateSelect : FC <CollectionFormProps> = ({
    collection, setCollection
}) =>{

    const templates = ["Default"];

    return <div className="SalesTemplateSelectView"><Form.Item label={"Sales Page Template"} labelAlign={"right"}>   
    <Select defaultValue={collection.attributes?.filter(a=>{
        return a.name === AttributeType.SalesPageTemplate
    })[0]?.value ?? "Default"} style={{maxWidth:"220px",textAlign:"left"}}
    onChange={(e)=>{
        if (setCollection && collection) {
            setCollectionAttribute(AttributeType.SalesPageTemplate, e, collection, setCollection);
        }
    }}>
        {
            templates.map((e,i)=>{
                return <Option key={"stOpt"+i} value={e}>{e}</Option>
            })
        }
    </Select></Form.Item></div>
}
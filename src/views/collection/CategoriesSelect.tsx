import { FC } from "react";
import { CollectionFormProps } from "./Form";
import { Select, Form } from "antd";

const { Option } = Select;

export const CategoriesSelect : FC <CollectionFormProps> = ({
    collection, setCollection
}) =>{

    const categories = ["Concert", "Event", "Seminar"];

    return <Form.Item label={"Category"} labelAlign={"right"} required={true}>   
    <Select value={collection.category ?? ""} style={{maxWidth:"320px",textAlign:"left"}}
    onChange={(e)=>{
        if (setCollection) {
            setCollection({...collection, category : e});
        }
    }}>
        {
            categories.map((e,i)=>{

                return <Option key={"catOpt"+i} value={e}>{e}</Option>
              
            })
        }

    </Select></Form.Item>
}
import { FC } from "react";
import { CollectionFormProps } from "./Form";
import { Select, Form } from "antd";
import { AttributeType } from "../../models";
import { EyeOutlined } from "@ant-design/icons";
import { setCollectionAttribute } from "./OtherInfoForm";
import { SALE_PAGE_TEMPLATES } from "../../models";
import useCollectionsContract from "../../hooks/useCollectionsContract";

const { Option } = Select;

export const SalesTemplateSelect : FC <CollectionFormProps> = ({
    collection, setCollection, 
}) =>{

    const templates = SALE_PAGE_TEMPLATES;

    const {shortCollectionUri} = useCollectionsContract();

    return <div className="SalesTemplateSelectView"><Form.Item label={"Sales Page Template"} labelAlign={"right"}>   
    <Select value={collection.attributes?.filter(a=>{
        return a.name === AttributeType.SalesPageTemplate
    })[0]?.value ?? "1"} style={{maxWidth:"130px",textAlign:"left"}}
    onChange={(e)=>{
        if (setCollection && collection) {
            setCollectionAttribute(AttributeType.SalesPageTemplate, e, collection, setCollection);
        }
    }}>
        {
            templates.map((e,i)=>{
                return <Option key={"stOpt"+i} value={e.id+""}>{e.name}</Option>
            })
        }
    </Select>
    <EyeOutlined title="Preview of the selected template" 
    style={{marginLeft:"10px",cursor:"pointer"}}
    onClick={async ()=>{
        let templId = collection.attributes?.filter( (a)=> {

            return a.name === AttributeType.SalesPageTemplate;
        })[0]?.value; 
        
        let cid = await shortCollectionUri(collection);
        let preview = `/collectionPreview/${cid}/${templId}`;
        window.open(preview,"_blank");
    }}/>
    </Form.Item>
    </div>
}
import { FC } from "react";
import { CollectionFormProps } from "./Form";
import { AttributeType } from "../../models";
import { setCollectionAttribute } from "./OtherInfoForm";
import { FormInput } from "../components/FormInput";
import { TwitterOutlined, FacebookOutlined, LinkOutlined } from "@ant-design/icons";
import './css/LinksForm.css';

export const LinksForm : FC <CollectionFormProps> = ({
    collection, setCollection, 
}) =>{
    return <div className="LinksForm">
        <div>Links</div>
        <div className="row"><FormInput style={{maxWidth:"500px"}} 
        label={<TwitterOutlined style={{marginRight:"6px"}}/>}
        formItemStyle={{display:"inline"}} onChange={(e)=>{

            setCollectionAttribute(AttributeType.Twitter, e.target.value, collection,
                setCollection);
        }} value={collection?.attributes?.filter(a => 
        {return a.name === AttributeType.Twitter})[0]?.value}/>
        </div>
        <div className="row"><FormInput label={<FacebookOutlined style={{marginRight:"6px"}}/>}
        style={{maxWidth:"500px"}} formItemStyle={{display:"inline"}} onChange={(e)=>{
            setCollectionAttribute(AttributeType.Facebook, e.target.value, collection,
                setCollection);
        }} value={collection?.attributes?.filter(a => 
        {return a.name === AttributeType.Facebook})[0]?.value}/>
        </div>
        <div className="row"><FormInput label={<LinkOutlined style={{marginRight:"6px"}}/>} 
        style={{maxWidth:"500px"}} formItemStyle={{display:"inline"}} onChange={(e)=>{

            setCollectionAttribute(AttributeType.Website, e.target.value, collection,
                setCollection);
        }} value={collection?.attributes?.filter(a => 
        {return a.name === AttributeType.Website})[0]?.value}/>
        </div>

    </div>
}
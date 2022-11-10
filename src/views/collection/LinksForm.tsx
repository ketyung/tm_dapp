import React, { FC, useState } from "react";
import { CollectionFormProps } from "./Form";
import { AttributeType } from "../../models";
import { setCollectionAttribute } from "./OtherInfoForm";
import { FormInput } from "../components/FormInput";
import { TwitterOutlined, FacebookOutlined, LinkOutlined,
PlusCircleOutlined } from "@ant-design/icons";
import './css/LinksForm.css';


type Link = {

    icon : React.ReactElement<HTMLElement>,

    attributeType : AttributeType,
}

const links : Link[] = [
    {icon : <TwitterOutlined style={{marginRight:"6px"}} title="Twitter"/>,
    attributeType : AttributeType.Twitter},
    {icon : <FacebookOutlined style={{marginRight:"6px"}} title="Twitter"/>,
    attributeType : AttributeType.Facebook},
    {icon : <LinkOutlined style={{marginRight:"6px"}} title="Twitter"/>,
    attributeType : AttributeType.Website},
]


export const LinksForm : FC <CollectionFormProps> = ({
    collection, setCollection, 
}) =>{

    const [reqLinks, setReqLinks] = useState<Link[]>([
        links[0]]);

    const addLink = () =>{
        if (reqLinks.length < links.length) {
            setReqLinks([...reqLinks, links[reqLinks.length]]);
        }
    }


    return <div className="LinksForm">
        <div>Links <PlusCircleOutlined style={{marginLeft:"10px",cursor:"pointer"}}
        onClick={()=>{ addLink();}}/>
        </div>
        {reqLinks.map(l=>{

            return <div className="row"><FormInput style={{maxWidth:"500px"}} 
            label={l.icon}
            formItemStyle={{display:"inline"}} onChange={(e)=>{

                setCollectionAttribute(l.attributeType, e.target.value, collection,
                    setCollection);
            }} value={collection?.attributes?.filter(a => 
            {return a.name === l.attributeType})[0]?.value}/>
            </div>

        })}

    </div>
}
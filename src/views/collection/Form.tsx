import { Collection } from "../../models";
import { InfoForm } from "./InfoForm";
import { LogoAndTmplForm } from "./LogoAndTmplForm";
import { BulbOutlined } from "@ant-design/icons";
import { FC, useState } from "react";
import './css/Form.css';


export type CollectionFormProps = {

    collection : Collection

    setCollection? : (collection: Collection)=> void,
}


type Props = {

    title? : string, 
}

export const Form : FC <Props> = ({
    title
}) =>{

    const [collection, setCollection] = useState<Collection>({
        title : "", owner : "", symbol : "",
    });

    return <div className="CollectionForm">
        <div className="title"><h3><BulbOutlined style={{marginRight:"6px"}}/>{title ?? "Create Your Ticket Collection"} </h3></div>
        <div className="formCol">
            <InfoForm setCollection={setCollection} collection={collection}/>
        </div>   
        <div className="formCol">
            <LogoAndTmplForm collection={collection} setCollection={setCollection}/>
        </div>  
    </div>
}
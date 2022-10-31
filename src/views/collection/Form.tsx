import { Collection } from "../../models";
import { InfoForm } from "./InfoForm";
import { LogoAndTmplForm } from "./LogoAndTmplForm";
import { BulbOutlined } from "@ant-design/icons";
import { FC, useState } from "react";
import { Button } from "antd";
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

    const [selectedRow, setSelectedRow] = useState<number>();

    return <div className="CollectionForm">
        <div className="title"><h3><BulbOutlined style={{marginRight:"6px"}}/>{title ?? "Create Your Ticket Collection"} </h3></div>
        <div className="formCol" style={{width:"55%"}}>
            <InfoForm setCollection={setCollection} collection={collection} 
            setSelectedRowForPreview={setSelectedRow}/>
        </div>   
        <div className="formCol" style={{width:"40%"}}>
            <LogoAndTmplForm collection={collection} setCollection={setCollection}
            selectedRow={selectedRow}/>
        </div>  
        <div style={{textAlign:"center"}}>
        <Button shape="round" style={{background:"#384",color:"white",
        minWidth:"260px",marginTop:"10px",fontWeight:600}}>Create</Button>
        </div>
      
    </div>
}
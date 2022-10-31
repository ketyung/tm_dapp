import { Collection } from "../../models";
import { InfoForm } from "./InfoForm";
import { LogoAndTmplForm } from "./LogoAndTmplForm";
import { BulbOutlined } from "@ant-design/icons";
import { FC, useState } from "react";
import { Message, MessageType } from "../../models";
import useUsersContractState from "../../utils/sm/hooks/useUsersContractState";
import { Button, Spin } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
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

    const [message, setMessage] = useState<Message>();

    const [processing, setProcessing] = useState(false);    
    
    const {createAndDeployNftContract} = useUsersContractState();

    const setMessageAndDimiss = (message : Message, dismissAfterSeconds : number = 3000) =>{

        setMessage(message);

        setTimeout(()=>{
            setMessage(undefined);
        }, dismissAfterSeconds);
    }

    const createCollection = async () =>{

        setProcessing(true);
        setMessage(undefined);

        await createAndDeployNftContract(collection, (e)=>{

            if ( e instanceof Error){

                setMessageAndDimiss({text: e.message, type: MessageType.Error});    
            }
            else {

                setMessageAndDimiss({text : "Success", type: MessageType.Info});
            }

            setProcessing(false);
        })
    }

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
        <Button shape="round" onClick={async (e)=>{
            e.preventDefault();
            await createCollection();
        }} style={{background:"#384",color:"white",
        minWidth:"260px",marginTop:"10px",fontWeight:600}}>
        {processing ? <Spin size="small"/> : <>Create</>}    
        </Button>
        {message && <div style={{marginTop:"10px",background:message.type===MessageType.Error ? "#d00" : "#56a",
        borderRadius:"20px",padding:"10px",color:"white"}}>
        {message.type===MessageType.Error && <ExclamationCircleOutlined style={{marginRight:"10px"}}/>} 
        {message.text}</div>}
        </div>
      
    </div>
}
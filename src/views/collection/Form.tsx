import { Collection } from "../../models";
//import { InfoForm } from "./InfoForm";
import { LogoAndTmplForm } from "./LogoAndTmplForm";
import { BulbOutlined } from "@ant-design/icons";
import { FC, useState, useEffect } from "react";
import { Message, MessageType } from "../../models";
import useUsersContractState from "../../hooks/useUsersContractState";
import { Button, Spin } from "antd";
import { EventTabbedForm } from "./EventTabbedForm";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import './css/Form.css';


export type CollectionFormProps = {

    collection : Collection

    setCollection? : (collection: Collection)=> void,

    isEditMode? : boolean, 

    style? : React.CSSProperties ,
    
}


type Props = {

    title? : string, 

    isEditMode? : boolean, 

    collectionForEdit? : Collection,
}

export const Form : FC <Props> = ({
    title,isEditMode, collectionForEdit 
}) =>{

    const [collection, setCollection] = useState<Collection>({
        title : "", owner : "", symbol : "",
    });

    const [message, setMessage] = useState<Message>();

    const [processing, setProcessing] = useState(false);    
    
    const {createAndDeployNftContract, updateCollection} = useUsersContractState();

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

    const updateCollectionNow = async () =>{

        setProcessing(true);
        setMessage(undefined);

        await updateCollection(collection, (e)=>{

            if ( e instanceof Error){

                setMessageAndDimiss({text: e.message, type: MessageType.Error});    
            }
            else {

                setMessageAndDimiss({text : "Success", type: MessageType.Info});
            }

            setProcessing(false);
        })
    }

    const saveCollection = async () =>{
        if ( isEditMode){
            await updateCollectionNow();
        }
        else {
            await createCollection();
        }
    }

    const [selectedRow, setSelectedRow] = useState<number>();

    useEffect(()=>{
       if (collectionForEdit)
            setCollection(collectionForEdit); 
    },[collectionForEdit]);

    return <div className="CollectionForm">
        <div className="title"><h3><BulbOutlined style={{marginRight:"6px"}}/>
        {title ?? "Create New Event"} </h3></div>
        <div style={{marginTop:"10px",background:message?.type===MessageType.Error ? "#d00" : "#56a",
        borderRadius:"20px",padding:"10px",color:"white", display:message ? "block":"none", 
        transition:"height 1.5s ease", marginBottom:"10px"}}>
        {message?.type===MessageType.Error && <ExclamationCircleOutlined style={{marginRight:"10px"}}/>} 
        {message?.text}</div>
      
        <div className="formCol" style={{width:"55%"}}>
            {<EventTabbedForm setCollection={setCollection} collection={collection} 
            setSelectedRowForPreview={setSelectedRow} isEditMode={isEditMode}/>}
        </div>   
        <div className="formCol" style={{width:"40%"}}>
            <LogoAndTmplForm collection={collection} setCollection={setCollection}
            selectedRow={selectedRow} isEditMode={isEditMode}/>
        </div>  
        <div style={{textAlign:"center"}}>
        <Button shape="round" 
        disabled={processing}
        onClick={async (e)=>{
            e.preventDefault();
            await saveCollection();
        }} style={{background:"#384",color:"white",
        minWidth:"260px",marginTop:"10px",fontWeight:600}}>
        {processing ? <Spin size="small"/> : <>{isEditMode ? "Update" : "Create"}</>}    
        </Button>
        </div>
      
    </div>
}
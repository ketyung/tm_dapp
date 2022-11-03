import { FC, useState, useCallback, useEffect } from "react";
import { Button, Spin } from "antd";
import { Collection, MessageType, ShortCorrectionInfo } from "../../../models";
import { genTemplateImageDataUri } from "../../collection/templates/util";
import useWalletState from "../../../hooks/useWalletState";
import useUsersContractState from "../../../hooks/useUsersContractState";
import { TwitterOutlined, FacebookOutlined, LinkOutlined } from "@ant-design/icons";
import { Message } from "../../../models";
import {Helmet} from "react-helmet";

import './css/Template1.css';

type Props = {

    hasSignedIn? : boolean,

    shortCollectionInfo? : ShortCorrectionInfo,

    collection? : Collection,
}


export const Template1 : FC <Props> = ({
    hasSignedIn, shortCollectionInfo, collection
}) =>{

    const {signIn} = useWalletState();

    const [ticketImage, setTicketImage] = useState<string>();

    const [stepCompleted, setStepCompleted] = useState<number>();

    const {ticketMint, loading} = useUsersContractState();

    const [message, setMessage] = useState<Message>();
    
    const mintTicketNow = async () =>{

        if ( collection && collection.ticket_types ){

            await ticketMint(collection, 
                collection.ticket_types[0], 
                setTicketImage, setStepCompleted, (e)=>{
                    if (e instanceof Error) {
                        setMessage({type : MessageType.Error, text : e.message});
                    }
                    else {

                        setMessage({type : MessageType.Info, text : e});
                    }
            });
        }
    }

    const obtainImageDataUri = useCallback(async ()=>{
        if ( collection)
            await genTemplateImageDataUri(collection, "000001", 0, setTicketImage);
     },[collection]);
 
     useEffect(()=>{
         obtainImageDataUri();
     },[collection]);


    return <div>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Mint your ticket for {shortCollectionInfo?.collectionId?.title}</title>       
        </Helmet>
        <Helmet bodyAttributes={{style: 'background-image:linear-gradient(to right, #001 , #345)'}}/>
        <div className="TopMenu">
            <TwitterOutlined className="Icon"/>
            <FacebookOutlined className="Icon"/>
            <LinkOutlined className="Icon"/>
        </div>
        <div className="Template1">
        <h3>Buy your ticket for</h3>
        <h2>{shortCollectionInfo?.collectionId?.title}</h2>
        <div>{ticketImage ? 
        <img src={ticketImage} className="TicketImage"/>    
        : <img src={shortCollectionInfo?.icon} className="Logo"/>}</div>
      
        { !hasSignedIn ? <Button className="ConnectButton" onClick={(e)=>{
            e.preventDefault();
            signIn();
        }}>Connect Your Wallet</Button>
        : <Button className="BuyButton" onClick={async ()=>{
            await mintTicketNow();
        }}>
        {loading ? <>{stepCompleted && <span 
        style={{background:"#345",padding:"4px",width:"30px", height:"auto",
        color:"white",borderRadius:"20%"}}>{stepCompleted}</span>} <Spin style={{marginLeft:"6px"}}/></> 
        : <>Mint Ticket</>}</Button>}

        {message && <div style={{background:"white",
        borderRadius:"20px",padding:"10px",
        marginTop:"10px",color:message.type=== MessageType.Error ? "red" : "blue"}}>
        {message.text}
        </div>}
    </div></div>
}
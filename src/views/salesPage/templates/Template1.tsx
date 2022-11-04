import { FC, useState, useCallback, useEffect } from "react";
import { Button, Spin } from "antd";
import { Collection, MessageType, ShortCorrectionInfo } from "../../../models";
import { genTemplateImageDataUri } from "../../collection/templates/util";
import useWalletState from "../../../hooks/useWalletState";
import useUsersContractState from "../../../hooks/useUsersContractState";
import { TopMenu } from "../TopMenu";
import { Message } from "../../../models";
import { MessageView } from "../MessageView";
import { InfoView } from "../../InfoView";
import {Helmet} from "react-helmet";
import { LocalStorage } from "../../../utils/local-storage";

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
    
    const {ticketMint, loading} = useUsersContractState();

    const [message, setMessage] = useState<Message>();

    const [forwardingToNear, setForwardingToNear] = useState(false);
    
    const mintTicketNow = async () =>{

        if ( collection && collection.ticket_types ){

            await ticketMint(collection, 
                collection.ticket_types[0], 
                setTicketImage, (e)=>{
                    if (e instanceof Error) {
                        setMessage({type : MessageType.Error, text : e.message});
                    }
                    else {
                        setMessage({type : MessageType.Info, text : e});
                        setForwardingToNear(true);
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

         let testRs = LocalStorage.get("TestRes");
         if ( testRs !== null)
            console.log("testRs", testRs);

     },[collection]);


    return <div>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Mint your ticket for {shortCollectionInfo?.collectionId?.title}</title>       
        </Helmet>
        <Helmet bodyAttributes={{style: 'background-image:linear-gradient(to right, #001 , #345)'}}/>
        <TopMenu collection={collection}/>
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
        : <Button className="BuyButton" disabled={loading || forwardingToNear} onClick={async ()=>{
            await mintTicketNow();
        }}>
        {loading ? <Spin size="small"/> 
        : <>Mint Ticket</>}</Button>}

        {message && <MessageView message={message}/>}

        <InfoView style={{marginTop:"20px"}} infoTextStyle={{color:"white"}}
        infoTextTitle={"View TX on Explorer: "}/>
    </div></div>
}
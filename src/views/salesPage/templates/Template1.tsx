import { FC, useState, useCallback, useEffect } from "react";
import { Button, Spin } from "antd";
import { Collection, MessageType, ShortCorrectionInfo, TicketType } from "../../../models";
import { genTemplateImageDataUri } from "../../collection/templates/util";
import useUsersContractState from "../../../hooks/useUsersContractState";
import { TopMenu } from "../TopMenu";
import { Message } from "../../../models";
import { MessageView } from "../MessageView";
import { TicketTypesView } from "../TicketTypesView";
import { MintButton } from "../MintButton";
import { InfoView } from "../../InfoView";
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


    const [ticketImage, setTicketImage] = useState<string>();

    const [selectedTicketType, setSelectedTicketType] = useState<TicketType>();
    
    const [clicked, setClicked] = useState(false);

    const {ticketMint, loading} = useUsersContractState();

    const [message, setMessage] = useState<Message>();

    const mintTicketNow = async () =>{

        if ( collection && collection.ticket_types ){

            await ticketMint(collection, 
                selectedTicketType ?? collection.ticket_types[0], 
                setTicketImage, (e)=>{
                    if (e instanceof Error) {
                        setClicked(false);
                        setMessage({type : MessageType.Error, text : e.message});
                    }
                    else {
                        setMessage({type : MessageType.Info, text : e});
                    }
                    
            });
        }
    }


    const setSelectedTicketTypeNow = async (ticketType : TicketType) =>{

        if ( collection) {

            let idx = collection.ticket_types?.indexOf(ticketType) ?? 0;
            await genTemplateImageDataUri(collection, "000000", idx, setTicketImage);
            setSelectedTicketType(ticketType);
        }
      
    }

    const obtainImageDataUri = useCallback(async ()=>{
        if ( collection)
            await genTemplateImageDataUri(collection, "000000", 0, setTicketImage);
     },[collection]);
 
     useEffect(()=>{
         obtainImageDataUri();
     },[collection]);


    return <div>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Mint your ticket for {shortCollectionInfo?.collectionId?.title}</title>       
        </Helmet>
        <Helmet bodyAttributes={{style: 'background-image:linear-gradient(to right, #001 , #35a)'}}/>
        <TopMenu collection={collection} className="TopMenu1"/>
        <div className="Template1">
        <h3>Buy your ticket for</h3>
        <h2>{shortCollectionInfo?.collectionId?.title}</h2>
        <div>{ticketImage ? 
        <img src={ticketImage} className="TicketImage"/>    
        : <img src={shortCollectionInfo?.icon} className="Logo"/>}</div>

        <TicketTypesView setSelectedTicketType={setSelectedTicketTypeNow}
        selectedTicketType={selectedTicketType} collection={collection}/>

        {message && <MessageView message={message}/>}
 
        <MintButton collection={collection} hasSignedIn={hasSignedIn}
        setButtonDisabled={setClicked} buttonDisabled={clicked} loading={loading}
        mintTicket={mintTicketNow}/>
       
        <InfoView style={{marginTop:"20px"}} infoTextStyle={{color:"white"}}
        infoTextTitle={"View TX on Explorer: "}/>
    </div></div>
}
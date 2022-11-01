import { FC, useState, useCallback, useEffect } from "react";
import { Button } from "antd";
import { Collection, ShortCorrectionInfo } from "../../../models";
import { genTemplateImageDataUri } from "../../collection/templates/util";
import useWalletState from "../../../utils/sm/hooks/useWalletState";
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

    const obtainImageDataUri = useCallback(async ()=>{
        if ( collection)
            await genTemplateImageDataUri(collection, 0, setTicketImage);
     },[collection]);
 
     useEffect(()=>{
         obtainImageDataUri();
     },[collection]);


    return <div className="Template1">
        <Helmet>
            <meta charSet="utf-8" />
            <title>Mint your ticket for {shortCollectionInfo?.collectionId?.title}</title>       
        </Helmet>
        <Helmet bodyAttributes={{style: ' background-image:linear-gradient(to right, #223 , #345)'}}/>
        <h3>Buy your ticket for</h3>
        <h2>{shortCollectionInfo?.collectionId?.title}</h2>
        <div>{ticketImage ? 
        <img src={ticketImage} style={{width:"500px",height:"auto"}}/>    
        : <img src={shortCollectionInfo?.icon} className="Logo"/>}</div>
        { !hasSignedIn ? <Button className="ConnectButton" onClick={(e)=>{
            e.preventDefault();
            signIn();
        }}>Connect Your Wallet</Button>
        : <Button className="BuyButton">
        Buy Ticket</Button>}
    </div>
}
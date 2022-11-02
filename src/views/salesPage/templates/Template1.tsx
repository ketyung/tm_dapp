import { FC, useState, useCallback, useEffect } from "react";
import { Button, Spin } from "antd";
import { Collection, ShortCorrectionInfo } from "../../../models";
import { genTemplateImageDataUri } from "../../collection/templates/util";
import useWalletState from "../../../utils/sm/hooks/useWalletState";
import useCollectionsContract from "../../../utils/sm/hooks/useCollectionsContract";
import useUsersContractState from "../../../utils/sm/hooks/useUsersContractState";
import {Helmet} from "react-helmet";
import './css/Template1.css';
import { Wallet } from "../../../near/Wallet";

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

    const {getNextTicketNumber} = useCollectionsContract();

    const {genNextTicketNumber, loading, setLoading} = useUsersContractState();

    const [nextTicketNumber, setNextTicketNumber] = useState<string>();

    const getNextTicketNumNow = async () =>{

        let cid = {
            title: collection?.title ?? "",
            owner : collection?.owner ?? "",
            symbol : collection?.symbol ?? "",
        };

        await genNextTicketNumber(cid, 6, async (e)=>{

            if (e instanceof Error){
                setNextTicketNumber("Error :"+e.message);
                setLoading(false);
            }
            else { 
                setLoading(true);
                let n = await getNextTicketNumber(cid, 6);
                if ( n )
                    setNextTicketNumber(n);
                
                if ( collection)
                    await genTemplateImageDataUri(collection, n, 0, setTicketImage);
    
                setLoading(false);

                
            }

        });
        
    }

    const obtainImageDataUri = useCallback(async ()=>{
        if ( collection)
            await genTemplateImageDataUri(collection, nextTicketNumber, 0, setTicketImage);
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
        <div><Button onClick={async ()=>{
            await getNextTicketNumNow();
        }} shape="round">{loading ? <Spin size="small"/> 
        : <>{nextTicketNumber ? nextTicketNumber 
        : "Get Next Ticket Number"}</>}</Button></div>

        { !hasSignedIn ? <Button className="ConnectButton" onClick={(e)=>{
            e.preventDefault();
            signIn();
        }}>Connect Your Wallet</Button>
        : <Button className="BuyButton">
        Buy Ticket</Button>}
    </div>
}
import { FC } from "react";
import { Button } from "antd";
import { Collection, ShortCorrectionInfo } from "../../../models";
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

    return <div className="Template1">
        <Helmet>
            <meta charSet="utf-8" />
            <title>Mint your ticket for {shortCollectionInfo?.collectionId?.title}</title>       
        </Helmet>
        <Helmet bodyAttributes={{style: ' background-image:linear-gradient(to right, #223 , #345)'}}/>
        <h3>Buy your ticket for</h3>
        <h2>{shortCollectionInfo?.collectionId?.title}</h2>
        <div><img src={shortCollectionInfo?.icon} style={{width:"300px",height:"auto",
        borderRadius:"300px",border:"10px solid #aab"}}/></div>
        { !hasSignedIn ? <Button shape="round" 
        style={{background:"#349",color:"white",marginTop:"20px"}}>Connect Your Wallet</Button>
        : <Button className="BuyButton">
        Buy Ticket</Button>}
    </div>
}
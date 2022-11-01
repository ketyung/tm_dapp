import { FC } from "react";
import { Button } from "antd";
import { Collection, ShortCorrectionInfo } from "../../../models";

type Props = {

    hasSignedIn? : boolean,

    shortCollectionInfo? : ShortCorrectionInfo,

    collection? : Collection,
}


export const Template1 : FC <Props> = ({
    hasSignedIn, shortCollectionInfo, collection
}) =>{

    return <div className="Template1">
        <h3>Buy your ticket for</h3>
        <h2>{shortCollectionInfo?.collectionId?.title}</h2>
        { !hasSignedIn ? <Button shape="round" 
        style={{background:"#349",color:"white",marginTop:"20px"}}>Connect Your Wallet</Button>
        : <Button shape="round" style={{background:"#396",color:"white",marginTop:"20px"}}>
        Buy Ticket</Button>}
    </div>
}
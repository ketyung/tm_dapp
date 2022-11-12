import { FC } from "react";
import { Button, Tooltip } from "antd";
import { ShareView } from "../components/ShareView";
import { TwitterOutlined, FacebookOutlined, LinkOutlined, ShareAltOutlined } from "@ant-design/icons";
import { PurchasedTicketsView } from "./PurchasedTicketsView";
import { AttributeType, Collection } from "../../models";


type Props = {
    collection? : Collection,
    className? : string,
    ticketsViewBackgroundColor? : string,
}

export const TopMenu : FC <Props> = ({
    collection, className, ticketsViewBackgroundColor
}) =>{

    const twiter : string|undefined = collection?.attributes?.filter((e)=>{
        return e.name === AttributeType.Twitter
    })[0]?.value;

    const fb : string|undefined = collection?.attributes?.filter((e)=>{
        return e.name === AttributeType.Facebook
    })[0]?.value;

    const website : string|undefined = collection?.attributes?.filter((e)=>{
        return e.name === AttributeType.Website
    })[0]?.value;



    return <div className={ className ?? "TopMenu"}>
        {collection && <PurchasedTicketsView collection={collection} 
        backgroundColor={ticketsViewBackgroundColor}/>}
        <div className="Buttons">
        <Button type="link" shape="circle" className="Icon" icon={<TwitterOutlined/>}
        href={twiter ?? "https://twitter.com/techchee"} target="_blank"/>
        <Button type="link" shape="circle" className="Icon" icon={<FacebookOutlined/>}
        href={fb ?? "https://facebook.com/ketyung"} target="_blank"/>
        <Button type="link" shape="circle" className="Icon" icon={<LinkOutlined/>}
        href={website ?? "https://techchee.com"} target="_blank"/>
        <Tooltip title={<ShareView uri={window.location.href}/>} >
        <Button type="link" shape="circle" className="Icon" icon={<ShareAltOutlined/>}/>
        </Tooltip>
        </div>
    </div>
}
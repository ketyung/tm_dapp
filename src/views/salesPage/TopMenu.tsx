import { FC } from "react";
import { Button } from "antd";
import { TwitterOutlined, FacebookOutlined, LinkOutlined } from "@ant-design/icons";
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
        <Button type="link" shape="circle" className="Icon" icon={<TwitterOutlined/>}
        href={twiter ?? "https://twitter.com/techchee"} target="_blank"/>
        <Button type="link" shape="circle" className="Icon" icon={<FacebookOutlined/>}
        href={fb ?? "https://facebook.com/ketyung"} target="_blank"/>
        <Button type="link" shape="circle" className="Icon" icon={<LinkOutlined/>}
        href={website ?? "https://techchee.com"} target="_blank"/>
    </div>
}
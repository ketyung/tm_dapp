import { ExclamationCircleOutlined, InfoOutlined } from "@ant-design/icons";
import { FC } from "react";
import { Message, MessageType } from "../../models";

type Props = {
    message? : Message,
}


export const MessageView : FC <Props> = ({
    message
}) =>{

    return <div className="MessageView" style={{color:message?.type=== MessageType.Error ? "red" : "blue"}}>
    {message?.type === MessageType.Error ? <ExclamationCircleOutlined style={{marginLeft:"6px"}}/> : 
    <InfoOutlined style={{marginLeft:"6px"}}/>} {message?.text}
    </div>

}
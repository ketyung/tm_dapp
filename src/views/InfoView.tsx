import { FC } from "react";
import { useQuery } from "../utils";
import { ExclamationCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { EXPLORER_URL } from "../near/const";
import './css/InfoView.css';

type Props = {
    style? : React.CSSProperties,

    infoTextStyle? : React.CSSProperties,

    errorTextStyle? : React.CSSProperties,

    infoTextTitle? : string,

}

export const InfoView : FC <Props> = ({
    style , infoTextStyle, errorTextStyle, infoTextTitle
}) => {

    const query = useQuery();

    const errorMessage = query.get("errorMessage");

    const txHash = query.get("transactionHashes");

    return <div className="InfoView" style={{...style, display: 
        (errorMessage === null && txHash === null) ? "none" : "block"}}>
        {errorMessage !== null && 
        <div style={errorTextStyle ? errorTextStyle : {color:"red"}}>
        <ExclamationCircleOutlined style={{marginRight:"10px"}}/>    
        {decodeURI(errorMessage)}</div>}

        {txHash !== null && 
        <div style={ infoTextStyle ? infoTextStyle : {color:"#36f"}}>
        <InfoCircleOutlined style={{marginRight:"10px"}}/>    
        {infoTextTitle ?? "View TX"} <a target="_blank" href={`${EXPLORER_URL}${txHash}`}>
        {txHash}</a></div>}
    </div>
}

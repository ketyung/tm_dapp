import { FC } from "react";
import { useQuery } from "../utils";
import { ExclamationCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { EXPLORER_URL } from "../near/const";
import './css/InfoView.css';

export const InfoView : FC = () => {

    const query = useQuery();

    const errorMessage = query.get("errorMessage");

    const txHash = query.get("txHash");

    return <div className="InfoView" style={{display: 
        (errorMessage === null && txHash === null) ? "none" : "block"}}>
        {errorMessage !== null && 
        <div style={{color:"red"}}>
        <ExclamationCircleOutlined style={{marginRight:"10px"}}/>    
        {decodeURI(errorMessage)}</div>}

        {txHash !== null && 
        <div style={{color:"blue"}}>
        <InfoCircleOutlined style={{marginRight:"10px"}}/>    
        View TX <a target="_blank" href={`${EXPLORER_URL}${txHash}`}>
        {txHash}</a></div>}
    </div>
}

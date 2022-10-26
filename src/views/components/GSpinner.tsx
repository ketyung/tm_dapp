import { FC } from "react";
import { Spin } from "antd";

type Props ={
    text? : string,

    style? : React.CSSProperties,
}

export const GSpinner : FC<Props> = ({
    text, style 
}) =>{

    return <div style={style}><div style={{padding:"2px 10px 10px 5px",background:"#ccc",borderRadius:"60px",
    width:"24px",height:"24px", display:"inline-block", marginRight:"4px"}}>
    <Spin size="small" style={{marginRight:"4px"}}/>
    </div> <span style={{marginLeft:"2px"}}>{text ?? "Processing..."}</span></div>
}
import { FC } from "react";
import { Button } from "antd";
import { TopNavBar } from "./NSTopNavBar";
import { InfoCircleFilled } from "@ant-design/icons";
import useWalletState from "../hooks/useWalletState";
import nearLogo from '../images/near_logo_wht.png';
import noCode from '../images/no-code.png';
import logo from '../images/logo1.png';
import './css/NotSignedInView.css';

export const NotSignedInView : FC = () =>{

    const {signIn} = useWalletState();

    return <><TopNavBar/><div className="NotSignedInDiv">
    <a href="/" style={{textDecoration:"none"}}><img src={logo} className="Logo" title="Ticket Mint..."/></a>

    <div className="InfoView">
    <img src={noCode} style={{maxHeight:"100px",maxWidth:"auto",marginRight:"10px"}} /> 
    <div className="txt">A <span style={{color:"#f92"}}>no code</span> online tool<br/>for
    event organizers<br/>to create &amp; sell NFT<br/>tickets with ease.</div>   
    </div>
    
    <Button className="LaunchAppButton" onClick={()=>{
        signIn();}}>Launch App
    <img src={nearLogo} style={{width:"100px",height:"auto",marginLeft:"10px",marginRight:"4px"}} />
    TestNet
    </Button>
   
    <Button className="LaunchAppButton" onClick={()=>{window.alert("Coming soon...")}}>Launch App
    <img src={nearLogo} style={{width:"100px",height:"auto",marginLeft:"10px",marginRight:"4px"}} />
    MainNet
    </Button>
   
    <Button className="LaunchAppButton" target="_blank" type="link" href={process.env.REACT_APP_DOCS_URL}
    icon={<div style={{paddingTop:"10px"}}>Docs <InfoCircleFilled style={{marginLeft:"10px"}}/></div>}/>
   
    </div></>
}
import { FC } from "react";
import { Button } from "antd";
import { TopNavBar } from "./NSTopNavBar";
import useWalletState from "../hooks/useWalletState";
import nearLogo from '../images/near_logo_wht.png';
import logo from '../images/logo1.png';
import './css/NotSignedInView.css';

export const NotSignedInView : FC = () =>{

    const {signIn} = useWalletState();

    return <><TopNavBar/><div className="NotSignedInDiv">
    <img src={logo} className="Logo"/>
    
    <Button className="LaunchAppButton" onClick={()=>{
        signIn();}}>Launch App
    <img src={nearLogo} style={{width:"100px",height:"auto",marginLeft:"10px",marginRight:"4px"}} />
    TestNet
    </Button>
   
    <Button className="LaunchAppButton" onClick={()=>{window.alert("Coming soon...")}}>Launch App
    <img src={nearLogo} style={{width:"100px",height:"auto",marginLeft:"10px",marginRight:"4px"}} />
    MainNet
    </Button>
    </div></>
}
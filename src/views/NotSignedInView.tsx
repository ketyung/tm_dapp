import { FC } from "react";
import { Button } from "antd";
import useWalletState from "../utils/sm/hooks/useWalletState";
import './css/NotSignedInView.css';

export const NotSignedInView : FC = () =>{

    const {signIn} = useWalletState();

    return <div className="NotSignedInDiv">
    <h2>You're NOT signed in yet, please sign in first</h2>
    <Button shape="round" style={{marginTop:"30px"}} onClick={()=>{
        signIn();
    }}>Click here to sign in</Button>
    <p style={{marginTop:"20px"}}>Test String: {process.env.REACT_APP_TEST_STR}</p>
    </div>
}
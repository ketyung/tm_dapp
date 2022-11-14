import { FC, useCallback, useEffect, useState } from "react";
import { UsersSettingsView } from "./UsersSettingsView";
import usePage from "../hooks/usePage";
import { Page } from "../models";
import { Button } from "antd";
import useWalletState from "../hooks/useWalletState";
import { HomeOutlined,QuestionCircleOutlined} from "@ant-design/icons";
import './css/TopNavBar.css';

export const TopNavBar : FC = () => {

    const {accountBalance} = useWalletState();

    const [balance, setBalance] = useState(0);

    const {setPage} = usePage();

    const fetchAccountBalance = useCallback(async ()=>{

        let b = await accountBalance();
        setBalance(b);
    
    },[accountBalance]);

    useEffect(()=>{

        fetchAccountBalance();

    },[fetchAccountBalance])



    return <div className="topNavBar">
        <span className="flSpan">
        <Button shape="circle" icon={<HomeOutlined/>} onClick={()=>{
            setPage(Page.Home)
        }}/>
        </span>
        <span className="flSpan whiteTxt">
        Balance : {balance.toFixed(3)} NEAR
        </span>
        <span className="frSpan">{/** https://christopher-ket-yung-chee.gitbook.io/ticket-maker/how-to/ */}
        <Button shape="circle" title="How to..." style={{color:"white",width:"30px",height:"30px",marginRight:"10px"}} 
        icon={<QuestionCircleOutlined/>} type="link" href={process.env.REACT_APP_HOWTO_DOCS_URL} 
        target="_blank"/>
        
        <UsersSettingsView/>
        </span>
    </div>
}
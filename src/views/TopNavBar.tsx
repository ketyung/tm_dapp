import { FC, useCallback, useEffect, useState } from "react";
import { UsersSettingsView } from "./UsersSettingsView";
import usePage from "../utils/sm/hooks/usePage";
import { Page } from "../models";
import { Button } from "antd";
import useWalletState from "../utils/sm/hooks/useWalletState";
import { HomeOutlined } from "@ant-design/icons";
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
        <span className="frSpan">
        <UsersSettingsView/>
        </span>
    </div>
}
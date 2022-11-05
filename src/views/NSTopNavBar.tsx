import { FC } from "react";
import { Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import gitHubLogo from '../images/GitHub-Mark.png';
import './css/TopNavBar.css';

export const TopNavBar : FC = () => {

    return <div className="topNavBar">
        <span className="flSpan">
        <Button shape="circle" style={{color:"white"}} icon={<HomeOutlined/>} type="link"
        href="/"/>
        </span>
        <span className="flSpan whiteTxt" style={{backgroundColor:"transparent"}}>
        &nbsp;
        </span>
        <span className="frSpan">
        <Button shape="circle" type="link" href="https://github.com/ticketMint22" target="_blank">
            <img src={gitHubLogo} style={{maxWidth:"30px",maxHeight:"auto"}}/>
        </Button>       
        </span>
    </div>
}
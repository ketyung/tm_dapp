import { FC } from "react";
import useWalletState from "../hooks/useWalletState";
import { Button, Menu, Dropdown } from "antd";
import { UserOutlined, LogoutOutlined, ProfileOutlined, StarOutlined } from "@ant-design/icons";
import usePage from "../hooks/usePage";
import { Page } from "../models";
import './css/UsersSettingsView.css';

export const UsersSettingsView : FC = () =>{

    const {signOut, accountId} = useWalletState();

    const {setPage} = usePage();

    const menu = (<Menu
        items={[
        {
            label: <div className="menuItem" onClick={()=>{
                setPage(Page.EditUserProfile);
            }}><ProfileOutlined style={{marginRight:"10px"}}/>Profile</div>,
            key: '0',
        },
        {
            label: <div className="menuItem" onClick={()=>{promptSignOut();}}><LogoutOutlined style={{marginRight:"10px"}}/>Sign Out</div>,
            key: '1',
        },
        ]}
    />
    );

    const promptSignOut = () =>{
        if ( window.confirm("Sign out now??")) {
            signOut(); 
            setTimeout(()=>{
                document.location.reload();
            }, 100); 
        }
    }

    return <Dropdown overlay={menu} trigger={['click']}>
        <Button className="triggerButt" onClick={(e)=>{
            e.preventDefault();
        }}><UserOutlined style={{marginRight:"10px"}}/> {accountId}</Button>
     </Dropdown>
}
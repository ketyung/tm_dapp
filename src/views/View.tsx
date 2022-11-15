import { FC, useState, useEffect } from "react";
import { SideBar } from "./SideBar";
import { Layout } from "antd";
import { DashboardView } from "./collection/DashboardView";
import { CollectionsView } from "./collection/CollectionsView";

export enum ViewType {

    Dashboard,

    Collections,

    Customers,
}

const { Sider, Content } = Layout;

export const View : FC = () =>{


    const [viewType, setViewType] = useState<ViewType>(ViewType.Dashboard);

    const [collapsed, setCollapsed] = useState(false);

    const [width, setWidth] = useState(window.innerWidth);

    const switchView = () =>{

        switch(+viewType) {

            case ViewType.Dashboard :
                return <DashboardView/>

            case ViewType.Collections :

                return <CollectionsView/>

            default :
                return <DashboardView/>
        }

    }

    useEffect(() => {
        
        const reportWindowSize =() =>{
            setWidth(window.innerWidth);
            //console.log("window.innerWidth:", window.innerWidth, new Date());
        }
    
        window.addEventListener('resize', reportWindowSize)
       
        return () => window.removeEventListener('resize', reportWindowSize)
    }, []);

    return  <Layout className="MainView" style={{margin:"0px", padding:"0px",minWidth:`${width}px`}}>
        <Sider trigger={null} collapsible collapsed={collapsed} width="250"
        style={{margin:"0px"}}>
            <SideBar setViewType={setViewType} viewType={viewType}/>
        </Sider>
        <Layout className="site-layout">
        <Content className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 680,
          }}>
        {switchView()}
        </Content>
        </Layout>
    </Layout>
}
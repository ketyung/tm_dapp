import { FC, useState } from "react";
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

    return  <Layout className="MainView" style={{margin:"0px",minWidth:"1400px"}}>
        <Sider trigger={null} collapsible collapsed={collapsed} width="250"
        style={{margin:"0px 10px"}}>
            <SideBar setViewType={setViewType}/>
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
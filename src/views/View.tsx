import { FC, useState, useEffect } from "react";
import { SideBar } from "./SideBar";
import { Layout } from "antd";
import { DashboardViewTypeStorage } from "../utils/local-storage";
import { DashboardView } from "./collection/DashboardView";
import { CollectionsView } from "./collection/CollectionsView";

export enum ViewType {

    Dashboard = 1,

    Collections = 2,

    Customers = 3,
}

const { Sider, Content } = Layout;

export const View : FC = () =>{


    const [viewType, setViewType] = useState<ViewType>(ViewType.Dashboard);


    const setViewTypeNow = ( viewType : ViewType) =>{

        setViewType(viewType);
        DashboardViewTypeStorage.setViewType(viewType);
    }

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
        }

        let vType = DashboardViewTypeStorage.getViewType();
        if ( vType !== undefined){
            setViewType( vType );
        }

        window.addEventListener('resize', reportWindowSize)
       
        return () => window.removeEventListener('resize', reportWindowSize);

       
    }, []);

    return  <Layout className="MainView" style={{margin:"0px", padding:"0px",minWidth:`${width}px`}}>
        <Sider trigger={null} collapsible collapsed={collapsed} width="240"
        style={{margin:"0px"}}>
            <SideBar setViewType={setViewTypeNow} viewType={viewType}/>
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
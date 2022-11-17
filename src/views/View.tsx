import { FC, useState, useEffect } from "react";
import { SideBar } from "./SideBar";
import { Layout } from "antd";
import { DashboardViewTypeStorage } from "../utils/local-storage";
import { DashboardView } from "./collection/DashboardView";
import { CollectionsView } from "./collection/CollectionsView";
import { MintsList } from "./collection/MintsList";
import { List as CustomerList } from "./customer/List";

export enum ViewType {

    Dashboard = 1,

    Collections = 2,

    Customers = 3,

    Sales = 4, 
}

const { Sider, Content } = Layout;

export const View : FC = () =>{


    const [viewType, setViewType] = useState<ViewType>(ViewType.Dashboard);

    const [collectionParam, setCollectionParam] = useState<any>();


    const setViewTypeNow = ( viewType : ViewType) =>{

        setViewType(viewType);
        DashboardViewTypeStorage.setViewType(viewType);
    }

    const setViewTypeWithParam = ( viewType : ViewType, param? : any) =>{

        setViewTypeNow(viewType);
        setCollectionParam(param);
    }

    const [collapsed, setCollapsed] = useState(false);

    const [width, setWidth] = useState(window.innerWidth);

    const switchView = () =>{

        switch(+viewType) {

            case ViewType.Dashboard :
                return <DashboardView/>

            case ViewType.Collections :

                return <CollectionsView setViewType={setViewTypeWithParam}/>

            case ViewType.Customers :
                return <CustomerList/>

            case ViewType.Sales :

                if (collectionParam)
                    return <MintsList title={collectionParam?.title} symbol={collectionParam.symbol}
                    setViewType={setViewTypeNow}/>;
                else
                    return <CollectionsView setViewType={setViewTypeWithParam}/>;

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
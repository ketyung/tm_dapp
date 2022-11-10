import { Collection, Page } from "../../models";
import { Button, Image, Menu, Dropdown, Tooltip} from "antd";
import { MoreOutlined, EditOutlined, EyeOutlined, ShoppingOutlined, ShareAltOutlined } from "@ant-design/icons";
import usePage from "../../hooks/usePage";
import { ListProps } from "./List";
import { ShareView } from "../components/ShareView";
import useCollectionsContract from "../../hooks/useCollectionsContract";
import { FC , useEffect, useState, useCallback} from "react";

type Props = ListProps & {

    collection : Collection,
    index? : number,
};

export const ListRow : FC <Props> = ({
    collection, index,setCollectionForEdit
}) =>{

    const {setPage} = usePage();

    const [url, setUrl] = useState<string>();

    const {getPageUriForCollection} = useCollectionsContract();

    
    const getUrl = useCallback(async ()=>{

        let s = await getPageUriForCollection(collection);

        setUrl(s);

        //console.log("get.url",s, new Date());
    },[collection]);

    useEffect(()=>{
        getUrl();
    },[getUrl])

  
    const menu = (<Menu
        items={[
        {
            label: <div className="menuItem" onClick={()=>{
    
                if ( setCollectionForEdit)
                    setCollectionForEdit(collection);
                    
            }}><EditOutlined style={{marginRight:"10px"}}/>Edit</div>,
            key: '0',
        },
        {
            label: <div className="menuItem" onClick={()=>{

                setPage(Page.TicketSales, {title : collection.title, symbol : collection.symbol});
    
            }}><EyeOutlined style={{marginRight:"10px"}}/>Ticket Sales</div>,
            key: '1',
        },

        {
            label: <div className="menuItem" onClick={()=>{

                window.open(url,"_blank");
    
            }}><ShoppingOutlined style={{marginRight:"10px"}}/>Open Sales Page</div>,
            key: '2',
        },
      
        {
            label: <div className="menuItem">
                <Tooltip color="#236" title={<ShareView uri={url} quote={collection.title}/>}>
                <ShareAltOutlined style={{marginRight:"10px"}}/>Share Sales Page
                </Tooltip>
                </div>,
            key: '3',
        },
      
        ]}
    />
    );

    return <tr key={"row"+(index)}>
        <td style={{width:"5%"}}>
        {((index ?? 0)+1)}.
        </td>
        <td style={{width:"20%"}}>
        {collection.icon && <Image src={collection.icon} placeholder="Loading..."
        style={{width:"30px",height:"30px",borderRadius:"30px",marginRight:"4px"}}/>}
        {collection.title}
        </td>
        <td style={{width:"30%",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
        {collection.description}
        </td>
        <td style={{width:"10%"}}>
        {collection.total_tickets}
        </td>
        <td style={{width:"10%"}}>
        <Button type="link" onClick={()=>{
            setPage(Page.TicketSales, {title : collection.title, symbol : collection.symbol});
        }}>{collection.tickets_sold}</Button>
        </td>
        <td style={{width:"10%"}}><Dropdown overlay={menu} trigger={['click']}>
        <Button shape="circle" onClick={(e)=>{
            e.preventDefault();
        }}><MoreOutlined/></Button>
        </Dropdown>
        </td>
    </tr>
}
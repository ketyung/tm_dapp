import { FC, useState, useCallback, useEffect } from "react";
import useCollectionsContract from "../../utils/sm/hooks/useCollectionsContract";
import { Collection } from "../../models";
import { MoreOutlined } from "@ant-design/icons";
import { Button, Image } from "antd";
import { GSpinner } from "../components/GSpinner";
import './css/List.css';

export const List : FC = () =>{

    const {getCollectionsOf, loading} = useCollectionsContract();

    const [collections, setCollections] = useState<Collection[]>();

    const loadCollections = useCallback(async ()=>{

        let colls = await getCollectionsOf(0);
        setCollections(colls);
        
    },[getCollectionsOf]);

    useEffect(()=>{
        loadCollections();
    },[]);

    return <table className="CollectionList" cellPadding={3} cellSpacing={3}>
        <thead>
            <tr>
                <td style={{width:"5%"}}>
                No.
                </td>
                <td style={{width:"20%"}}>
                Title
                </td>
                <td style={{width:"30%"}}>
                Description
                </td>
                <td style={{width:"10%"}}>
                Total Tickets
                </td>
                <td style={{width:"10%"}}>
                Tickets Sold
                </td>
                <td style={{width:"10%"}}>
                Actions
                </td>
            </tr>
        </thead>
        <tbody>
        {
            collections?.map((c,i)=>{

                return  <tr key={"row"+i}>
                    <td style={{width:"5%"}}>
                    {(i+1)}.
                    </td>
                    <td style={{width:"20%"}}>
                    {c.icon && <Image src={c.icon} placeholder="Loading..."
                    style={{width:"30px",height:"30px",borderRadius:"30px",marginRight:"4px"}}/>}
                    {c.title}
                    </td>
                    <td style={{width:"30%",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
                    {c.description}
                    </td>
                    <td style={{width:"10%"}}>
                    {c.total_tickets}
                    </td>
                    <td style={{width:"10%"}}>
                    {c.tickets_sold}
                    </td>
                    <td style={{width:"10%"}}>
                    <Button shape="circle" icon={<MoreOutlined/>}></Button>
                    </td>
                </tr>;
            })
        }
        { loading && <tr><td colSpan={6} style={{width:"100%"}}><GSpinner text="Loading..."/></td></tr>}
        { (collections !== undefined && collections.length ===0 ) && <tr><td colSpan={6} style={{width:"100%"}}>
            No collection found, click "Create New Collection Ticket" to create a new one</td></tr>}
        </tbody>

    </table>
}
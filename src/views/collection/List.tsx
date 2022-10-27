import { FC, useState, useCallback, useEffect } from "react";
import useCollectionsContract from "../../utils/sm/hooks/useCollectionsContract";
import { Collection } from "../../models";
import { ListRow } from "./ListRow";
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

                return <ListRow key={"ListRow"+i} collection={c} index={i}/>;
            })
        }
        { loading && <tr><td colSpan={6} style={{width:"100%"}}><GSpinner text="Loading..."/></td></tr>}
        { (collections !== undefined && collections.length ===0 ) && <tr><td colSpan={6} style={{width:"100%"}}>
            No collection found, click "Create New Collection Ticket" to create a new one</td></tr>}
        </tbody>

    </table>
}
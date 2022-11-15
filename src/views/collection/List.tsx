import { FC, useState, useCallback, useEffect } from "react";
import useCollectionsContract from "../../hooks/useCollectionsContract";
import { Collection } from "../../models";
import { ListRow } from "./ListRow";
import { GSpinner } from "../components/GSpinner";
import './css/List.css';

export type ListProps = {

    setCollectionForEdit? : ( collection : Collection) => void,

    toReloadList?: boolean,

    setToReloadList? : (reload: boolean) => void,
}

export const List : FC <ListProps> = ({
    setCollectionForEdit, toReloadList, setToReloadList
}) =>{

    const {getCollectionsOf, loading} = useCollectionsContract();

    const [collections, setCollections] = useState<Collection[]>();

    const loadCollections = useCallback(async ()=>{

        let colls = await getCollectionsOf(0);
        setCollections(colls);
        
    },[getCollectionsOf]);

    useEffect(()=>{
        loadCollections();
    },[]);

    useEffect(()=>{
        if ( toReloadList){
            loadCollections();
            if ( setToReloadList)
                setToReloadList(false);
        }
    },[toReloadList]);

    return <div className="CollectionListDiv">
        <table className="CollectionList" cellPadding={3} cellSpacing={3}>
        <thead>
            <tr>
                <th style={{width:"5%"}}>
                No.
                </th>
                <th style={{width:"24%",textAlign:"justify"}}>
                Event Name/Title
                </th>
                {
                <th style={{width:"30%",textAlign:"justify"}}>
                Description
                </th>
                }
                <th style={{width:"10%"}}>
                Status
                </th>
                <th style={{width:"10%"}}>
                Total Tickets
                </th>
                <th style={{width:"10%"}}>
                Tickets Sold
                </th>
                <th style={{width:"10%"}}>
                Actions
                </th>
            </tr>
        </thead>
        <tbody>
        {
            collections?.map((c,i)=>{

                return <ListRow key={"ListRow"+i} collection={c} index={i} setCollectionForEdit={setCollectionForEdit}/>;
            })
        }
        { loading && <tr><td colSpan={6} style={{width:"100%"}}><GSpinner text="Loading..."/></td></tr>}
        { (collections !== undefined && collections.length ===0 ) && <tr><td colSpan={6} style={{width:"100%"}}>
            No collection found, click "Create New Collection Ticket" to create a new one</td></tr>}
        </tbody>

    </table></div>
}
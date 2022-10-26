import { FC, useState, useCallback, useEffect } from "react";
import useCollectionsContract from "../../utils/sm/hooks/useCollectionsContract";
import { Collection } from "../../models";

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

    return <></>
}
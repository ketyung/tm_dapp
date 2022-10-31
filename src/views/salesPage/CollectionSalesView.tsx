import { Collection } from "../../models";
import { FC, useEffect, useState, useCallback } from "react";
import useCollectionsContract from "../../utils/sm/hooks/useCollectionsContract";
import useWalletState from "../../utils/sm/hooks/useWalletState";


type Props = {
    id?: string, 
}

export const CollectionSalesView : FC <Props> = ({id}) =>{

    const {isSignedIn, dateUpdated} = useWalletState();

    const [loading,setLoading] = useState(false);

    const [hasSignedIn, setHasSignedIn] = useState(false);

    const checkIfSignedIn =  useCallback(async ()=>{
   
        setLoading(true);
     
        if ( await isSignedIn()) {
            setHasSignedIn(true);
            fetchCollection();
        }
        else {
            setHasSignedIn(false);
        }

        setLoading(false);

    },[dateUpdated,isSignedIn]);


    const [collection, setCollection] = useState<Collection>();

    const {getCollection, b64ToShortCollectionInfo} = useCollectionsContract();

    const fetchCollection = useCallback(async ()=>{
        if ( id ) {
            let collInfo = b64ToShortCollectionInfo(id);
            let c = await getCollection(collInfo.collectionId);
            setCollection(c);
        }
    },[id]);

    useEffect(()=>{
        checkIfSignedIn();
    },[]);

    return <>
    {!hasSignedIn ? 
    <div style={{width:"300px",background:"#347",color:"white",padding:"10px",
    borderRadius:"20px",margin:"auto", marginTop:"20px"}}>
    Please Sign In 
    </div> :
    <div>
    {collection?.title}
    </div>
    }

    </>
}
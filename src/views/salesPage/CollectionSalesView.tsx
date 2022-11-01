import { Collection, ShortCorrectionInfo } from "../../models";
import { FC, useEffect, useState, useCallback } from "react";
import { Template1 } from "./templates/Template1";
import { GSpinner } from "../components/GSpinner";
import useCollectionsContract from "../../utils/sm/hooks/useCollectionsContract";
import useWalletState from "../../utils/sm/hooks/useWalletState";


type Props = {
    id?: string, 
}

export const CollectionSalesView : FC <Props> = ({id}) =>{

    const {isSignedIn, dateUpdated} = useWalletState();

    const [shortCollectionInfo, setShortCollectionInfo] = useState<ShortCorrectionInfo>();
   
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
        if (shortCollectionInfo ) {
       
            let c = await getCollection(shortCollectionInfo.collectionId);
            setCollection(c);
        }
    },[id]);

    const getShortCollectionInfo = () =>{

        if ( id ) {
            let collInfo = b64ToShortCollectionInfo(id);
            setShortCollectionInfo(collInfo);
        }
    }

    useEffect(()=>{
        getShortCollectionInfo();
        checkIfSignedIn();
    },[]);


    const switchView = () =>{

        if (shortCollectionInfo) {

            switch(+(shortCollectionInfo.templateId ?? 0)) {

                case 1 :
                    return <Template1 shortCollectionInfo={shortCollectionInfo}
                    collection={collection} hasSignedIn={hasSignedIn}/>

                default :

                    return <GSpinner text="Loading..." style={{margin:"auto",marginTop:"30px"}}/>

            }
        }
    }

    return <>
    {loading ? <GSpinner text="Loading..." style={{margin:"auto",marginTop:"30px"}}/> : switchView()}
    </>
}
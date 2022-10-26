import { FC, useEffect, useCallback, useState } from "react";
import useWalletState from "../utils/sm/hooks/useWalletState";
import { SignedInView } from "./SignedInView";
import { NotSignedInView } from "./NotSignedInView";
import { Spin } from "antd";

export const HomeView : FC = () =>{

    const {isSignedIn, dateUpdated} = useWalletState();

    const [loading,setLoading] = useState(false);

    const [hasSignedIn, setHasSignedIn] = useState(false);

    const checkIfSignedIn =  useCallback(async ()=>{
   
        setLoading(true);
        if ( await isSignedIn()) {
            setHasSignedIn(true);
        }
        else {
            setHasSignedIn(false);
        }

        setLoading(false);

    },[dateUpdated,isSignedIn]);

    useEffect(()=>{
        checkIfSignedIn();
    }, [checkIfSignedIn]);

    const view = hasSignedIn ? <SignedInView/> : <NotSignedInView/>;

    return <>
    {loading ? <Spin style={{marginTop:"20px"}}/> : view}
    </>
}
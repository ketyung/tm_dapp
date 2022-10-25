import { FC, useEffect, useCallback, useState } from "react";
import useWalletState from "../utils/sm/hooks/useWalletState";
import { SignedInView } from "./SignedInView";
import { NotSignedInView } from "./NotSignedInView";
import { Button } from "antd";

export const HomeView : FC = () =>{

    const {isSignedIn, dateUpdated} = useWalletState();

    const [hasSignedIn, setHasSignedIn] = useState(false);

    const checkIfSignedIn =  useCallback(async ()=>{
   
        if ( await isSignedIn()) {
            setHasSignedIn(true);
        }
        else {
            setHasSignedIn(false);
        }

    },[dateUpdated,isSignedIn]);

    useEffect(()=>{
        checkIfSignedIn();
    }, [checkIfSignedIn]);

    return <>
    {hasSignedIn ? <SignedInView/> : <NotSignedInView/>}
    
    </>
}
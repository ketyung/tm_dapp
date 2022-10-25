import { FC, useEffect, useCallback, useState } from "react";
import useWalletState from "../utils/sm/hooks/useWalletState";
import { SignedInView } from "./SignedInView";
import { Button } from "antd";

export const HomeView : FC = () =>{

    const {isSignedIn,signIn, dateUpdated} = useWalletState();

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
    {hasSignedIn ? <SignedInView/> :
    <p><Button shape="round" style={{marginTop:"30px"}} onClick={()=>{
        signIn();
    }}>Click here to sign in</Button></p>
    }
    
    </>
}
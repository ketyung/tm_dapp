import { FC , useCallback, useEffect, useState} from "react";
import useUsersContractState from "../hooks/useUsersContractState";
import { UserForm } from "./user/UserForm";
//import { View } from "./collection/View";
import { View } from "./View";
import { GSpinner } from "./components/GSpinner";

export const UserPromptView : FC = () =>{

    const {hasUser, loading } = useUsersContractState();

    const [hasProfile, setHasProfile] = useState<boolean>();

    const checkHasProfile = useCallback(async ()=>{
        if ( hasProfile === undefined ){
            let b = await hasUser();
            setHasProfile(b);
        }
    },[hasUser, hasProfile]);

    const checkHasProfileNow = useCallback(async ()=>{
        
        await checkHasProfile();

    },[checkHasProfile]);

    useEffect(()=>{
        checkHasProfileNow();
    },[checkHasProfileNow]);

    const userView = hasProfile ? <View/> : <UserForm/>;

    return <>{loading ? <GSpinner text="Loading..." style={{marginTop:"20px"}}/> :userView}</>
}
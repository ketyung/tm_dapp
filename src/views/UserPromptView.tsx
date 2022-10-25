import { FC , useCallback, useEffect, useState} from "react";
import useUsersContractState from "../utils/sm/hooks/useUsersContractState";
import { UserForm } from "./user/UserForm";

export const UserPromptView : FC = () =>{

    const {hasUser, isInitialized, init} = useUsersContractState();

    const [hasProfile, setHasProfile] = useState(false);

    const checkHasProfile = useCallback(async ()=>{
        let b = await hasUser();
        setHasProfile(b);
    },[hasUser]);

    const initAndCheckHasProfile = useCallback(async ()=>{
        
        if ( !isInitialized() ) {
            init();
        }
        await checkHasProfile();

    },[isInitialized,init, checkHasProfile]);

    useEffect(()=>{
        initAndCheckHasProfile();
    },[]);

    const userView = hasProfile ? <h2 style={{marginTop:"30px"}}>Welcome Back</h2> : <UserForm/>;

    return <>{userView}</>
}
import { useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Dispatch } from "redux";
import { useCallback} from "react";
import { initContract } from "../UsersContractActions";
import { UsersContractState } from "../UsersContractReducer";
import useWalletState from "./useWalletState";
import { User } from "../../../models";

export default function useUsersContractState() {

    const dispatch: Dispatch<any> = useDispatch();

    const [loading, setLoading] = useState(false);

    const {wallet}  = useWalletState();
    
    const usersContractState : UsersContractState =  useSelector(
        (_state: any) => {return _state.usersContractReducer;}, shallowEqual
    );

    const init = useCallback(() => { 
        if ( usersContractState.contract === undefined) {
            dispatch(initContract(wallet));    
        }
    },[dispatch]);


    const isInitialized = () : boolean =>{
        return usersContractState.contract !== undefined;
    }

    const hasUser = async () : Promise<boolean>=> {
        setLoading(true);

        let b =  await usersContractState.contract?.hasUser();
        setLoading(false);
        return b;
    } 

    const getUser = async () : Promise<User|undefined>=> {
        setLoading(true);
        let b =  await usersContractState.contract?.getUser();
        setLoading(false);
        return b;
    } 

    const signUpUser = async (user : User, completion? : (res : string|Error) => void) =>{

        setLoading(true);
        await usersContractState.contract?.signUpUser(user, (e)=>{
            if ( completion )
                completion(e);
            setLoading(false);
        });
    }

    const updateUser = async (user : User, completion? : (res : string|Error) => void) =>{

        setLoading(true);
        await usersContractState.contract?.updateUser(user, (e)=>{
            if ( completion )
                completion(e);
            setLoading(false);
        });
    }

   

    const createAndDeployNftContract  = async ( subAccountId : string ,
        initBalanceInNear : number , 
        initParam? : {name : string, symbol : string, icon? : string, base_uri? : string },
        completion? : (res : string|Error) => void ) => {

        setLoading(true);
        await usersContractState.contract?.createAndDeployNftContract(subAccountId, initBalanceInNear,
            initParam, (e)=>{
            if ( completion )
                completion(e);
            setLoading(false);
        });
    }


    return {init,hasUser, signUpUser, loading, isInitialized, getUser, updateUser, 
        createAndDeployNftContract} as const;
}
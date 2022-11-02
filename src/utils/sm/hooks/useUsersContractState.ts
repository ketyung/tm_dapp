import { useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Dispatch } from "redux";
import { useCallback} from "react";
import { initContract } from "../UsersContractActions";
import { UsersContractState } from "../UsersContractReducer";
import useWalletState from "./useWalletState";
import { Collection, User, CollectionId } from "../../../models";

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


    const genNextTicketNumber = async (collectionId : CollectionId, 
        width : number = 7,
        completion? : (res : string|Error) => void) =>{

        setLoading(true);
        await usersContractState.contract?.genNextTicketNumber(collectionId, width,
        (e)=>{
           
            if ( completion )
                completion(e);
            setLoading(false);
        });

       
    }

   

    const createAndDeployNftContract  = async ( collection : Collection,
        completion? : (res : string|Error) => void ) => {

        if (collection.title.trim() === "") {
            if (completion)
                completion(new Error("Title is blank!"));
            return; 
        }

        if (collection.icon === undefined) {

            if ( completion)
                completion(new Error("Please provide an icon/logo for your event/collection"));
            return; 
        }

        if ( collection.total_tickets === 0) {

            if ( completion)
                completion(new Error("Please specify the total number of tickets of your event/collection"));
            return; 
        }

        if ( collection.category === undefined) {

            if ( completion)
                completion(new Error("Please choose a category for your event/collection"));
            return; 
        }



        setLoading(true);
        await usersContractState.contract?.createCollectionAndDeploy(collection,
            20, (e)=>{
            if ( completion )
                completion(e);
            setLoading(false);
        });
    }


    return {init,hasUser, signUpUser, loading, isInitialized, getUser, updateUser, 
        createAndDeployNftContract, genNextTicketNumber, setLoading} as const;
}
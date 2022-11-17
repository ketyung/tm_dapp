import { useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Dispatch } from "redux";
import { useCallback, useEffect} from "react";
import { initContract } from "../utils/sm/UsersContractActions";
import { UsersContractState } from "../utils/sm/UsersContractReducer";
import useWalletState from "./useWalletState";
import { Collection, User, CollectionId, TicketType, AttributeType } from "../models";
import useCollectionsContract from "./useCollectionsContract";
import { fromOnchainTicketPrice } from "../utils";
import { genTemplateImageDataUri } from "../views/collection/templates/util";
import { uploadImageToArweave } from "../arweave";

export default function useUsersContractState() {

    const dispatch: Dispatch<any> = useDispatch();

    const [loading, setLoading] = useState(false);

    const {wallet,accountBalance}  = useWalletState();
    
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

    const getUserBy = async (accountId : string) : Promise<User|undefined>=> {
        setLoading(true);
        let b =  await usersContractState.contract?.getUserBy(accountId);
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
        completion? : (res : any|Error) => void) =>{

        setLoading(true);
        await usersContractState.contract?.genNextTicketNumber(collectionId, width,
        (e)=>{
           
            if ( completion )
                completion(e);
            setLoading(false);
        });

       
    }


    const updateCollection  = async ( 
        collection : Collection,
        completion? : (res : string|Error) => void ) => {

        try {

            setLoading(true);
            await usersContractState.contract?.updateCollection(collection,(e)=>{
                if ( completion )
                    completion(e);
                setLoading(false);
            });
        }
        catch(e : any){
            if ( completion )
                completion(e);
            setLoading(false);
        }
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
            22, (e)=>{
            if ( completion )
                completion(e);
            setLoading(false);
        });
    }


    const {getNextTicketNumber} = useCollectionsContract();


   
    const checkHasExceededMaxTicketPerWallet = async (collection : Collection) : 
    Promise<{exceeded:boolean, maxTicketPerWallet? : number}>=>{

        let aa = collection.attributes?.filter(a=>{
            return a.name === AttributeType.MaxTicketPerWallet
        });

        if ( aa && (aa?.length ?? 0) > 0) {

            let maxTicketPerWallet = parseInt(aa[0].value);
            if ( !isNaN(maxTicketPerWallet)){

                let mintedTickets : any[] = await getMintedTicketsIn(collection);
                if (mintedTickets.length >= maxTicketPerWallet){
                    return { exceeded:true, maxTicketPerWallet : maxTicketPerWallet} ;
                }
            } 
        }

        return { exceeded:false } ;
       

    }


    const ticketMint = async ( collection : Collection, 
        ticketType : TicketType , 
        setTicketImageCallback? : (imgDataUri?: string) => void, 
        completion? : (res : string|Error) => void ) => {
    
            setLoading(true);

            let collectionId = {
                title: collection?.title ?? "",
                owner : collection?.owner ?? "",
                symbol : collection?.symbol ?? "",
            };


            let hasExceedMtpw = await checkHasExceededMaxTicketPerWallet(collection);

            if ( hasExceedMtpw.exceeded ) {

                setLoading(false);
                if(completion)
                    completion(new 
                        Error(`Exceeded the total number of tickets per wallet ${hasExceedMtpw.maxTicketPerWallet}`));
                return;            
            }
           
            let ticketPrc = parseFloat(fromOnchainTicketPrice(ticketType?.price ?? 0));
           
            let bal = await accountBalance();

            if ( bal < ticketPrc){
                if (completion) {
                    setLoading(false);
                    completion(new Error(
                        `Your account balance ${bal.toFixed(2)} is less than the ticket price ${ticketPrc.toFixed(2)}`));
                    return;
                }
            }

            

            await genNextTicketNumber(collectionId, 6, async (e)=>{

                if (e instanceof Error){
                    setLoading(false);

                    if ( completion )
                        completion(e);

                    return;
                }
                else { 

                    let ticketNumber = await getNextTicketNumber(collectionId, 6);

                    if (ticketNumber === undefined){

                        setLoading(false);
                        if(completion)
                            completion(new Error("Failed to get new ticket number"));
                        return;
                    }

                    let imgUri : string | undefined = undefined;

                    let idx = collection.ticket_types?.indexOf(ticketType) ?? 0;

                    await genTemplateImageDataUri(collection, ticketNumber, idx, (d)=>{
                        imgUri = d ;
                        if ( setTicketImageCallback) {
                            setTicketImageCallback(d);
                        }
                    });

                    let arImageUri : string|undefined ;

                    if (imgUri){

                        await uploadImageToArweave(imgUri, "image/png", (e)=>{

                            if ( e instanceof Error){

                                setLoading(false);
                                if (completion) completion(e);
                                return; 
                            }
                            else {

                                arImageUri = e;
                            }
                        });
                    }


                    if (arImageUri) {

//                        console.log("arweave.img::", arImageUri, new Date());

                        await usersContractState.contract?.ticketMint(
                            collectionId, ticketNumber, 
                            arImageUri,ticketType,
                            (e)=>{

                                if ( e instanceof Error){
    
                                    if (completion) completion(e);
                                    //setLoading(false);
                                    return; 
                                }
                                else {
    
                                    if (completion) {
                                        completion(e);
                                 //       setLoading(false);
                                    }
                                }
                            }   
                        );
                    }

                }
                                 
            });
          
    }


    const getMintedTicketsIn = async (collection : Collection ) => {

        return (await usersContractState.contract?.getMintedTicketsIn(collection));
    }


    const initUserContract = useCallback(()=>{
        
        if ( !isInitialized() ) {
            init();
        }
    },[isInitialized,init]);

   
    useEffect (()=>{
        initUserContract();
    },[]);


    return {init,hasUser, signUpUser, loading, isInitialized, getUser, updateUser, 
        createAndDeployNftContract, genNextTicketNumber, setLoading, ticketMint,
        getMintedTicketsIn,updateCollection, getUserBy} as const;
}
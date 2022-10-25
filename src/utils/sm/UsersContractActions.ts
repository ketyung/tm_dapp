import { Wallet } from "../../near/Wallet";

export const INIT_CONTRACT = "INIT_CONTRACT";


export type UsersContractAction = {

    type: string,

    wallet? : Wallet, 

    dateUpdated? : Date, 

}



export function initContract(wallet? : Wallet) {

    const action: UsersContractAction = {
        type: INIT_CONTRACT,
        wallet : wallet,
        dateUpdated : new Date(), 
    } 
  
    return action;
}

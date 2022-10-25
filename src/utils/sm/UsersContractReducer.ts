import { USERS_CONTRACT_ID } from "../../near/const";
import { UsersContract } from "../../near/UsersContract";
import * as Actions from "./UsersContractActions";

export type UsersContractState = {

    contract? : UsersContract,

    dateUpdated? : Date, 

    lastError? : Error, 

}


const INIT_STATE : UsersContractState = {
    dateUpdated : new Date(), 
};


export const UsersContractReducer = (state : UsersContractState = INIT_STATE, action : Actions.UsersContractAction ) : 
UsersContractState => {

 
    switch(action.type) {

        case Actions.INIT_CONTRACT :          
            

            if ( action.wallet ) {

                let contract =  new UsersContract(
                    USERS_CONTRACT_ID,
                    action.wallet
                );
    
                return {...state, contract : contract, dateUpdated : action.dateUpdated};
            }

            return {...state,lastError : Error("Wallet is undefined!"), dateUpdated : action.dateUpdated};

        default :

            return state; 
    }
}

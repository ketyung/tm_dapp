import { Wallet } from "../../near/Wallet";
import * as WalletActions from './WalletActions';
import { USERS_CONTRACT_ID } from "../../near/const";

export type WalletState = {

    wallet : Wallet,

    dateUpdated? : Date, 

    lastError? : Error, 

}

const defaultWallet = new Wallet({ createAccessKeyFor: USERS_CONTRACT_ID });

const INIT_STATE : WalletState = {
    
    wallet : defaultWallet ,

    dateUpdated : new Date(), 
};


export const WalletReducer = (state : WalletState = INIT_STATE, action : WalletActions.WalletAction ) : WalletState => {

 
    switch(action.type) {

        case WalletActions.SIGN_IN_WALLET :
          
            let err : Error|undefined = undefined;

            let wallet : Wallet = state.wallet;
            try {
                wallet.signIn();
            }
            catch( e : any) {
                err = e;    
            }

            //console.log("wallet.accountId::",wallet.accountId, new Date());
 
            return {...state, wallet : wallet, 
                dateUpdated : action.dateUpdated, lastError : err};

        case WalletActions.SIGN_OUT_WALLET :
        
            let _e : Error|undefined = undefined;

            try {
                state.wallet.signOut();
            }
            catch( e : any) {
                _e = e;    
            }

            return {...INIT_STATE, dateUpdated : action.dateUpdated, lastError : _e};

            
        default :

            return state; 
    }
}

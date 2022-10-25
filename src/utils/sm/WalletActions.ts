export const SIGN_IN_WALLET = "SIGN_IN_WALLET";


export const SIGN_OUT_WALLET = "SIGN_OUT_WALLET";


export type WalletAction = {

    type: string,

    dateUpdated? : Date, 
}


export function signInWallet() {

    const action: WalletAction = {
        type: SIGN_IN_WALLET,
        dateUpdated : new Date(), 
    } 
  
    return action;
}


export function signOutWallet() {

    const action: WalletAction = {
        type: SIGN_OUT_WALLET,
        dateUpdated : new Date(), 
    } 
    return action;
}

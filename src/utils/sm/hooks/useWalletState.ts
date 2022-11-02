import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Dispatch } from "redux";
import { useCallback} from "react";
import { signInWallet, signOutWallet } from "../WalletActions";
import { Wallet } from "../../../near/Wallet";
import { WalletState } from "../WalletStateReducer";
import * as NearApi from 'near-api-js';
import { WalletConnection } from "near-api-js";
import * as Const from '../../../near/const';

const keyStore = new NearApi.keyStores.BrowserLocalStorageKeyStore();

const config  : NearApi.ConnectConfig = {

    nodeUrl: Const.NODE_URL,
    keyStore: keyStore,
    networkId: Const.NETWORK,
    walletUrl: Const.WALLET_URL,
    helperUrl: Const.HELPER_URL,
    headers : {},
    
};

export default function useWalletState() {

    const dispatch: Dispatch<any> = useDispatch();

    const signIn = useCallback(() => dispatch(signInWallet()),
    [dispatch]);

    const signOut = useCallback(() => dispatch(signOutWallet()),
    [dispatch]);


    const walletState : WalletState =  useSelector(
        (_state: any) => {return _state.walletStateReducer;}, shallowEqual
    );

    const wallet : Wallet = walletState.wallet;


    const isSignedIn = async () :Promise<boolean> =>{
        return await wallet.startUp();
    }


    const dateUpdated= walletState.dateUpdated;

    const accountId : string = walletState.wallet.accountId;


    const accountBalance = async () : Promise<number> => {

        let near = await NearApi.connect(config);
        let acc = await near.account(accountId);
        let b = await acc.getAccountBalance();
        return (parseFloat(b.available) / Math.pow(10, 24));
    }


    const getConnection = async () =>{

        let near = await NearApi.connect(config);
        return near; 
    }

    const getAccount = async () =>{

        let conn = await NearApi.connect(config);
        let acc = await conn.account(wallet.accountId ?? "");   
        return acc; 
    }


    const getWalletConnection = async () =>{

        let conn = await NearApi.connect(config);
        return new WalletConnection(conn, "my-app");
    }

    const getTxResult = async ( txHash : string) =>{

        let rs = await wallet.getTransactionResult(txHash);
        return rs;
    }
   

    
    return {isSignedIn, wallet, signIn, signOut, accountId, accountBalance, dateUpdated,
    getConnection, getAccount , getWalletConnection, getTxResult} as const;
}
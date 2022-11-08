import { FC } from "react";
import useWalletState from "../../hooks/useWalletState";
import useCollectionsContract from "../../hooks/useCollectionsContract";
import { Button, Spin } from "antd";
import { Collection } from "../../models";

type Props = {

    collection? : Collection,

    hasSignedIn? : boolean,

    mintTicket?: () => void,

    buttonDisabled?: boolean,

    setButtonDisabled? : ( disabled : boolean) => void, 

    loading? : boolean,
}

export const MintButton : FC <Props> = ({
    collection, hasSignedIn, mintTicket, buttonDisabled, setButtonDisabled, loading
}) =>{

    const {signIn} = useWalletState();

    const {isCollectionReadyForSale} = useCollectionsContract();

    const mintButton = isCollectionReadyForSale(collection) ? 
    <Button className="BuyButton" disabled={buttonDisabled} onClick={async ()=>{
        if ( setButtonDisabled)
            setButtonDisabled(true);
        if (mintTicket) mintTicket();
    }}> {loading ? <Spin size="small"/> : <>Mint Ticket</>}</Button> :<>Not Ready For Sale</>

    return !hasSignedIn ? <Button className="ConnectButton" onClick={(e)=>{
            e.preventDefault();signIn();
        }}>Connect Your Wallet</Button>
        : mintButton;
}
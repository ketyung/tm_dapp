import { FC, useState } from "react";
import useWalletState from "../../hooks/useWalletState";
import useCollectionsContract from "../../hooks/useCollectionsContract";
import useUsersContractState from "../../hooks/useUsersContractState";
import { Button, Spin, Modal } from "antd";
import { UserForm } from "../user/UserForm";
import { CloseCircleOutlined } from "@ant-design/icons";
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

    const {isCollectionReadyForSale, isBuyerRequiredToSignUp} = useCollectionsContract();

    const [userFormVisible, setUserFormVisible] = useState(false);

    const {hasUser} = useUsersContractState();    
    
    const toPromptBuyerToSignup = async (collection? : Collection) : Promise<boolean> => {

        let requiredToSignUp = isBuyerRequiredToSignUp(collection);
        let _hasUser = await hasUser();

        return (!_hasUser && requiredToSignUp);

    }


    const mintTicketNow = async () =>{

        if ( await toPromptBuyerToSignup(collection)){

            setUserFormVisible(true);
        }
        else {

            if ( setButtonDisabled)
                setButtonDisabled(true);
            if (mintTicket) 
                mintTicket();        
        }

    }

    const modal = <Modal closeIcon={<CloseCircleOutlined className="CloseButton" />}
        className="FormModal" closable={true} 
        onCancel={() => { setUserFormVisible(false);}}
        destroyOnClose={true}
        footer={null} style={{background:"transparent"}}
        maskClosable={false}
        open={userFormVisible}>
        <UserForm title="Please sign up for an account first"/>
    </Modal>


    const mintButton = isCollectionReadyForSale(collection) ? 
    <Button className="BuyButton" disabled={buttonDisabled} onClick={async ()=>{
        await mintTicketNow();
    }}> {loading ? <Spin size="small"/> : <>Buy Ticket</>}</Button> :<>Not Ready For Sale</>

    return <>{!hasSignedIn ? <Button className="ConnectButton" onClick={(e)=>{
            e.preventDefault();signIn();
        }}>Connect Your Wallet</Button>
        : mintButton}{modal}</>;
}
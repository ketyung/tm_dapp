import { FC , useEffect, useCallback} from "react";
import { TopNavBar } from "./TopNavBar";
import usePage from "../utils/sm/hooks/usePage";
import { Page } from "../models";
import { UserPromptView } from "./UserPromptView";
import { UserForm, UserFormType } from "./user/UserForm";
import { PageStorage } from "../utils/local-storage";
import useUsersContractState from "../utils/sm/hooks/useUsersContractState";
import './css/SignedInView.css';

export const SignedInView : FC = () =>{

    const {isInitialized, init} = useUsersContractState();

    const {page, setPage} = usePage();

    const initUserContract = useCallback(()=>{
        
        if ( !isInitialized() ) {
            init();
        }
    },[isInitialized,init]);

    const switchView = () =>{

        switch(page) {

            case Page.Home :
                return <UserPromptView/>
            
            case Page.EditUserProfile :

                return <UserForm formType={UserFormType.Edit} title="Edit Profile" buttonTitle="Update"
                cancelAction={()=>{
                    setPage(Page.Home);
                }}/>;
                
            default :

                return <UserPromptView/>
            
        }
    }


    useEffect(()=>{

        let p = PageStorage.getPage();
        if ( p !== undefined) {
            setPage(p);
        }

        initUserContract();
    },[]);

    return <>
    <TopNavBar/>
    <div className="content">
        <div className="main">
            {switchView()}
        </div>
    </div>
   
    </>
}
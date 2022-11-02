import { FC , useEffect} from "react";
import { TopNavBar } from "./TopNavBar";
import usePage from "../hooks/usePage";
import { Page } from "../models";
import { UserPromptView } from "./UserPromptView";
import { MintsList } from "./collection/MintsList";
import { UserForm, UserFormType } from "./user/UserForm";
import { PageStorage } from "../utils/local-storage";
import './css/SignedInView.css';
import { InfoView } from "./InfoView";

export const SignedInView : FC = () =>{

    const {page, setPage, param} = usePage();

    const switchView = () =>{

        switch(page) {

            case Page.Home :
                return <UserPromptView/>

            case Page.TicketSales :

                return <MintsList title={param?.title} symbol={param?.symbol}/>

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
    },[]);

    return <>
    <TopNavBar/>
    <div className="content">
        <div className="main">
            <InfoView/>
            {switchView()}
        </div>
    </div>
   
    </>
}
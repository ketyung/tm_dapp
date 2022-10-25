import { FC , useEffect} from "react";
import { TopNavBar } from "./TopNavBar";
import usePage from "../utils/sm/hooks/usePage";
import { Page } from "../models";
import { UserPromptView } from "./UserPromptView";
import { PageStorage } from "../utils/local-storage";
import './css/SignedInView.css';

export const SignedInView : FC = () =>{

    const {page, setPage} = usePage();

    const switchView = () =>{

        switch(page) {

            case Page.Home :
                return <UserPromptView/>
                
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
            {switchView()}
        </div>
    </div>
   
    </>
}
import { FC, useEffect } from 'react';
import {Route, Router, useRoute} from 'wouter';
import { HomeView } from './views/HomeView';
import { CollectionSalesView } from './views/salesPage/CollectionSalesView';


export const Routes : FC = () =>{
   
    const [matchHome] = useRoute("/");
    
    const [matchSalesPage] = useRoute("/c/:id");

    const pageTitle = () => {

        if (matchHome){
            return "Ticket Mint ...";
        }
        else if (matchSalesPage){
            return "Mint Ticket...";
        }
        else {

            return "TM";
        }

    }

    useEffect(() => {
        document.title = pageTitle();
    }, [pageTitle()]);



    return <Router>
        <Route path="/">
        <HomeView/>
        </Route>
        <Route path="/c/:id">
        {(params) => 
            <CollectionSalesView id={params.id}/>}
        </Route>
    </Router>
}
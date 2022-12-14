import { FC, useEffect } from 'react';
import {Route, Router, useRoute} from 'wouter';
import { HomeView } from './views/HomeView';
import { CollectionSalesView } from './views/salesPage/CollectionSalesView';


export const Routes : FC = () =>{
   
    const [matchHome] = useRoute("/");
    
    const [matchSalesPage] = useRoute("/collection/:id");

    const [matchSalesPageLong] = useRoute("/c/:id");

    const [matchSalesPagePreview] = useRoute("/collectionPreview/:id/:templateId");

    const pageTitle = () => {

        if (matchHome){
            return "TicketMaker - NFT Ticketing on Near Protocol";
        }
        else if (matchSalesPage || matchSalesPageLong){
            return "Mint Ticket...";
        }
        else if (matchSalesPagePreview){
            return "Preview for ";
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
        <Route path="/collection/:id">
        {(params) => 
            <CollectionSalesView id={params.id}/>}
        </Route>
        <Route path="/c/:id">
        {(params) => 
            <CollectionSalesView id={params.id} urlNotShorten={true}/>}
        </Route>
        <Route path="/collectionPreview/:id/:templateId">
        {(params) => 
            <CollectionSalesView id={params.id} previewTemplateId={params.templateId}/>}
        </Route>
    </Router>
}
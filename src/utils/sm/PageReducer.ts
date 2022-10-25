import { Page } from '../../models';
import * as PageActions from './PageActions';

export type PageState = {

    page? : Page,

    dateUpdated? : Date, 

}

const INIT_STATE : PageState = {
    
    page : Page.Home ,

    dateUpdated : new Date(), 
};


export const PageReducer = (state : PageState = INIT_STATE, action : PageActions.PageAction ) : PageState => {

 
    switch(action.type) {

        case PageActions.SET_PAGE :
          
            return {...state, page : action.page, dateUpdated : action.dateUpdated};
  
        default :

            return state; 
    }
}

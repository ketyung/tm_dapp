import { Page } from "../../models";

export const SET_PAGE = "SET_PAGE";

export type PageAction = {

    type: string,

    page? : Page,

    dateUpdated? : Date, 

}


export function setPage(page : Page) {

    const action: PageAction = {
        type: SET_PAGE,
        page: page,
        dateUpdated : new Date(), 
    } 
    return action;
}

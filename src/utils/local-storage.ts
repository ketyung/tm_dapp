import { Page } from "../models";
import { ViewType } from "../views/View";

export class LocalStorage {
	static get(name: string) {
		return localStorage.getItem(name);
	}

	static set(name: string, val: any) {
		return localStorage.setItem(name, val);
	}

	static remove(name : string){

		localStorage.removeItem(name);

	}
}

export class PageStorage {
	
    private static key : string = "CurrentPage";

    static setPage(page : Page ) {
		
		LocalStorage.set(this.key, page);
	}

	static getPage(): Page|undefined  {
		let p = LocalStorage.get(this.key);
        if ( p !== null){

            let pp = parseInt(p);
            if ( !isNaN(pp)) {

                switch(+pp) {

                    case Page.EditUserProfile :
                        return Page.EditUserProfile;

                    case Page.Home :
                        return Page.Home;

                    default :
                        return Page.Home;
                }
            }
        }

        return undefined;
    }
}


export class DashboardViewTypeStorage {
	
    private static key : string = "CurrentViewType";

    static setViewType(viewType : ViewType ) {
		
		LocalStorage.set(this.key, viewType);
	}

	static getViewType(): ViewType|undefined  {
		let p = LocalStorage.get(this.key);
        if ( p !== null){

            return parseInt(p); 
        }

        return undefined;
    }
}

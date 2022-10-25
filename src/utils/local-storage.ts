import { Page } from "../models";

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
	
    static setPage(page : Page ) {
		
		LocalStorage.set("CurrentPage", page);
	}

	static getPage(): Page|undefined  {
		let p = LocalStorage.get("CurrentPage");
        if ( p !== null){

            let pp = parseInt(p);
            if ( !isNaN(pp)) {

                switch(+pp) {

                    case Page.EditUserProfile :
                        return Page.EditUserProfile;

                    case Page.Home :
                        return Page.Home;

                    case Page.NFT :
                        return Page.NFT;

                    default :
                        return Page.Home;
                }
            }
        }

        return undefined;
    }
}

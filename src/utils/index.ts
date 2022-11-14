import * as nearApiJs from 'near-api-js';
import { CollectionId, Collection, AttributeType, ShortCorrectionInfo } from '../models';

export function nearTimestampToDateString(t : number) :string {

    let d = formatDate(new Date((t/1000000)));

    return d;
}

export function formatDate(date : Date) {
    let hours : number |string = date.getHours();
    let minutes : number|string = date.getMinutes();
    let secs : number|string = date.getSeconds();

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' +minutes : minutes;
    secs = secs < 10 ? '0' + secs : secs;
    
    let strTime = hours + ':' + minutes + ':' + secs;

    let mon : number|string = date.getMonth()+1;
    mon = mon < 10 ? '0' + mon : mon;

    let day : number|string = date.getDate();
    day = day < 10 ? '0' + day : day;
    
    return  date.getFullYear() + "-" + mon + "-" + day + " " + strTime;
}


export function timeSince(date? : Date, short? : boolean ) : string | undefined {

	if ( date ){

		let now = new Date(); 

		let seconds : number = Math.floor((now.getTime() - date.getTime()) / 1000);
	  
		let interval : number = seconds / 31536000;
	  
		if (interval > 1) {
		    return Math.floor(interval) + (short ? "Y" : " year" + ((interval >= 2) ? "s" : ""));
		}
		
        interval = seconds / 2592000;
		if (interval > 1) {
		    return Math.floor(interval) + (short ? "M" : " month" + ((interval >= 2) ? "s" : ""))
		}

		interval = seconds / 86400;
		if (interval > 1) {
		    return Math.floor(interval) + (short ? "D" : " day" + ((interval >= 2) ? "s" : ""));
		}
		interval = seconds / 3600;
		if (interval > 1) {
		    return Math.floor(interval) + (short ? "H" : " hour" + ((interval >= 2) ? "s" : ""));
		}

		interval = seconds / 60;
		if (interval > 1) {
		    return Math.floor(interval) + (short ? "m" : " minute" + ((interval >= 2) ? "s" : ""));
		}
		
        return Math.floor(seconds) + (short ? "s" : " second" + ((interval >= 2) ? "s" : ""));
	
	}
}


export function dateToTimeAgo(date?: Date): {short? : string, long? : string} {
	
	if ( date === undefined) return {short:"", long:""};

	let timeAgo = timeSince(date, true);
	let timeAgoLong = timeSince(date);
	
	return { short : timeAgo , long : timeAgoLong + " ago"};

}

export function nearTimestampToDateAgo(t : number) : {short? : string, long? : string} {

    let d = dateToTimeAgo(new Date((t/1000000)));

    return d;
}


export function acronym ( str : string ) : string | undefined {

	let matches = str.match(/\b(\w)/g); 

	if (matches !== null) {

		let acronym = matches.join(''); 
		return acronym;
	}
	
}

export const yoctoToNear = ( amount : string, decimalsCount? : number ) =>{

	if (decimalsCount) {
		let v = nearApiJs.utils.format.formatNearAmount(amount);
		return parseFloat(v).toFixed(decimalsCount);
	}
	return nearApiJs.utils.format.formatNearAmount(amount);
}


export const toOnchainTicketPrice = ( price : number ) : number =>{

	return Math.round(price * 1000);
}

export const fromOnchainTicketPrice = ( onChainTicketPrice : number, decimals : number = 2) : string => {
	return (onChainTicketPrice / 1000).toFixed(decimals);
}


export const nearTimestampToDate = ( ts : number) : Date =>{

	return new Date(ts/1000_000);
}


export const collectionIdToB64 = ( collectionId : CollectionId) => {
	return Buffer.from( JSON.stringify(collectionId) ).toString( "base64");
}

export const b64ToCollectionId = (b64str : string) : CollectionId => {

	let s = Buffer.from(b64str, "base64").toString();
	return JSON.parse(s) as CollectionId;
}


export const toB64OfShortInfo = ( collection? : Collection) => {

	let a = [collection?.title, collection?.symbol, collection?.owner, 
		collection?.attributes?.filter(a=> 
		{return a.name === AttributeType.SalesPageTemplate})[0]?.value ?? "1",
		collection?.icon ];

	return Buffer.from( JSON.stringify(a) ).toString( "base64");
}

export const b64ToShortInfo = (b64str : string) : ShortCorrectionInfo => {

	let s = Buffer.from(b64str, "base64").toString();
	let a = JSON.parse(s);

	return {

		collectionId : {

			title : a[0],
			symbol :a[1],
			owner : a[2],
		},
		templateId : a[3],
		icon : a[4],
	};
}


export const useQuery = () =>{

	return new URLSearchParams(window.location.search);
}


export const deepCopy = <T extends object>(source: T) : T =>{
	return JSON.parse(JSON.stringify(source));
} 

export const addDays = (date : Date, days : number) : Date => {
	date.setDate(date.getDate() + days);
    return date;
}


export const subtractDays = (date : Date, days : number) : Date => {
	date.setDate(date.getDate() - days);
    return date;
}



export const getDates7DaysAgoTillNow = () => {

	let endDate = new Date();
	let startDate = subtractDays(endDate, 7);
	return getDates(startDate, endDate);
}

export const getDates = (startDate : Date, endDate : Date) => {
    let dateArray = new Array();
    let currentDate = startDate;
    while (currentDate <= endDate) {
        dateArray.push(new Date (currentDate));
        currentDate =addDays(currentDate, 1);
    }
    return dateArray;
}

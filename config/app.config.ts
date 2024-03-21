import { IGeoCode } from "@/features/googleAPI/geocoder";

export const ATM_COUNT_DISPLAY_MAX = 5;
export const SEARCH_RANGE_MIN: number = 50;
export const SEARCH_RANGE_MAX: number = 1500;
export const MAP_CENTER_DEFAULT: IGeoCode = { lat: 1.420681, lng: 103.794389 };
export const ERRORMESSAGE_TIMEOUT: number = 5000;
export const SEARCHADDRESS_PARAM_NAME: string = "address";
export const SEARCHRANGE_PARAM_NAME: string = "range";
export const FILTEREDBANKS_PARAM_NAME: string = "filteredbanks";
export const ARRAY_PARAM_SEPARATOR: string = "%2C"; //used for separating bank items in URL searchParams

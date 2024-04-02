export const baseBankInfosUrl = "https://sgbanks.com/banks/";
export const baseBankAtmListUrl = "https://sgbanks.com/branches/";

export const divClassName = "lstbranches";

export interface rawAtmInfo {
  location: string;
  brand: string;
  address: string;
  info?: string[];
}

export function isRawAtmInfo(arg: any): arg is rawAtmInfo {
  return (
    arg &&
    arg.location &&
    typeof arg.location === "string" &&
    arg.brand &&
    typeof arg.brand === "string" &&
    arg.address &&
    typeof arg.address === "string"
  );
}

export interface bankEndpoint {
  bankInfo: string;
  atmList: string;
}

const dbsEndpoints: bankEndpoint = {
  bankInfo: "dbs-bank",
  atmList: "dbs-bank-atms-singapore",
};

const uobEndpoints: bankEndpoint = {
  bankInfo: "uob-singapore",
  atmList: "uob-singapore-atms",
};

const citibankEndpoints: bankEndpoint = {
  bankInfo: "citibank-singapore",
  atmList: "citibank-singapore-atms",
};

const maybankEndpoints: bankEndpoint = {
  bankInfo: "maybank-singapore",
  atmList: "maybank-singapore-branches-atms",
};

const standardCharteredEndpoints: bankEndpoint = {
  bankInfo: "standard-chartered-singapore",
  atmList: "standard-chartered-singapore-atms",
};

const ocbcEndpoints: bankEndpoint = {
  bankInfo: "ocbc-singapore-bank",
  atmList: "ocbc-singapore-bank-branches-atms",
};

const hsbcEndpoints: bankEndpoint = {
  bankInfo: "hsbc-singapore",
  atmList: "hsbc-singapore-branches-atms",
};

const anzEndpoints: bankEndpoint = {
  bankInfo: "anz-singapore-bank",
  atmList: "anz-singapore-branches-atms",
};

const cimbEndpoints: bankEndpoint = {
  bankInfo: "cimb-bank-singapore",
  atmList: "cimb-bank-singapore-branches",
};

const rhbEndpoints: bankEndpoint = {
  bankInfo: "rhb-singapore-bank",
  atmList: "rhb-singapore-branches",
};

const bankEndpoints = {
  dbs: dbsEndpoints,
  uob: uobEndpoints,
  citibank: citibankEndpoints,
  maybank: maybankEndpoints,
  standardchartered: standardCharteredEndpoints,
  ocbc: ocbcEndpoints,
  hsbc: hsbcEndpoints,
  anz: anzEndpoints,
  cimb: cimbEndpoints,
  rhb: rhbEndpoints,
};

export default bankEndpoints;

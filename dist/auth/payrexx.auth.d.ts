/**
 * Auth helper class
 * @Weslley De Souza 2020
 * */
export declare class AuthHelper {
    private _instance;
    private _secret;
    constructor(_instance: any, _secret: any);
    buildSignature(query: any, secret?: string, digTo?: string): any;
    buildUrl(json: any, qUri?: string, escape?: boolean): string;
    getCredential(): {
        instance: any;
        secret: any;
    };
}

import { PayrexxActions } from "./payrexx.actions";
import { PayRexx } from "../index";
/**
 * This class represents all Transactions Actions
 * https://developers.payrexx.com/reference#transaction
 * Not tested yed
 * @2020 Weslley De Souza
 * */
export declare class TransactionActions extends PayrexxActions {
    protected rex: PayRexx;
    constructor(rex: PayRexx);
    get(id: number, single?: boolean): any;
    create(params: any): void;
    capture(id: any, params?: {}): any;
    charge(id: any, params?: any): any;
    refund(id: any, params?: {}): any;
    delete(id: number): any;
    private getEndPoint;
}

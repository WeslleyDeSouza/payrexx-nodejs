import PayRexx from "../index";
import { PayrexxActions } from "./payrexx.actions";
interface ISubscription {
    userId: string;
    psp: string;
    amount: string;
    currency: string;
    purpose: string;
    paymentInterval: string;
    period: string;
    cancellationInterval: string;
    referenceId?: string;
    ApiSignature?: any;
}
/**
 * This class represents all Subscriptions Actions
 * https://developers.payrexx.com/reference#autologin
 * https://developers.payrexx.com/reference#subscription
 *
 * @2020 Weslley De Souza
 * */
export declare class SubscriptionsActions extends PayrexxActions {
    protected rex: PayRexx;
    constructor(rex: PayRexx);
    log(id: any): any;
    get(id: number): any;
    create(params: ISubscription): Promise<any[]>;
    delete(id: number): any;
    private getEndPoint;
}
export {};

import PayRexx from "../index";
import { PayrexxActions } from "./payrexx.actions";
interface IPayCreation {
    title: string;
    description: string;
    psp?: any;
    referenceId: string;
    purpose: string;
    amount: number;
    vatRate: number;
    currency: string;
    sku?: string;
    preAuthorization?: boolean;
    reservation?: any;
    ApiSignature?: any;
}
/**
 * This class represents all Payment Actions
 * https://developers.payrexx.com/reference#invoices-1
 *
 * @2020 Weslley De Souza
 * */
export declare class PaymentActions extends PayrexxActions {
    protected rex: PayRexx;
    constructor(rex: PayRexx);
    /**
     * Retrieve a payment link
     * endpoint:  https://api.payrexx.com/v1.0/Invoice/id/
     * */
    get(id: number): any;
    /**
     * Create a payment link
     * @params :IPayCreation
     *
     * */
    create(params: IPayCreation): any;
    /**
     * Remove a payment link
     * */
    delete(id: number): any;
    private getEndPoint;
}
export {};

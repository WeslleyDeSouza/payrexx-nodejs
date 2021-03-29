import { PayRexx } from "../index";
import { PayrexxActions } from "./payrexx.actions";
interface IGatewayCreate {
    amount: number;
    vatRate?: number;
    currency: string;
    sku?: string;
    purpose?: string;
    successRedirectUrl?: string;
    failedRedirectUrl?: string;
    cancelRedirectUrl?: string;
    psp?: number[];
    pm?: string[];
    preAuthorization?: boolean;
    chargeOnAuthorization?: boolean;
    reservation?: any;
    referenceId?: string;
    fields?: string;
    concardisOrderId?: string;
    skipResultPage?: string;
    validity?: number;
    buttonText?: string;
    successMessage?: string;
    ApiSignature?: any;
}
/**
 * This class represents all Gateway Actions
 * https://developers.payrexx.com/reference#gateway
 *
 * @2020 Weslley De Souza
 * */
export declare class GatewayActions extends PayrexxActions {
    protected rex: PayRexx;
    constructor(rex: PayRexx);
    get(id: number): any;
    create(params: IGatewayCreate): Promise<any[]>;
    delete(id: number): any;
    private getEndPoint;
}
export {};

import { AuthHelper } from "./auth/payrexx.auth";
import { PaymentActions } from "./actions/payrexx.actions.payment";
import { GatewayActions } from "./actions/payrexx.actions.gateway";
import { SubscriptionsActions } from "./actions/payrexx.actions.subscriptions";
export default class PayRexx {
    private _instance;
    private _secret;
    private _v;
    private endPoint;
    auth: AuthHelper;
    /**
     * actions
     * */
    payment: PaymentActions;
    gateway: GatewayActions;
    subscriptions: SubscriptionsActions;
    constructor(_instance: any, _secret: any, _v?: string);
    getEndPoint(): string;
    getApiSignature(query?: string): string;
    checkSignature(): Promise<boolean>;
}

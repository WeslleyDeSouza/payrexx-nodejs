import {PaymentActions} from "./actions/payrexx.actions.payment";
import {AuthHelper} from "./auth/payrexx.auth";
import {GatewayActions} from "./actions/payrexx.actions.gateway";
import {SubscriptionsActions} from "./actions/payrexx.actions.subscriptions";


export interface IPayRex {

    auth:   AuthHelper

    payment:PaymentActions

    gateway:GatewayActions

    subscriptions:SubscriptionsActions

    getEndPoint():string

    checkSignature(instance,secret):Promise<boolean>

}


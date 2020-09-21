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

// Actions
export interface IGatewayCreate {
    amount:number
    //Amount of payment in cents.

    vatRate?:number
    //VAT Rate Percentage

    currency: string
    //Currency of payment (ISO code).

    sku?:string
    //Product stock keeping unit

    purpose?:string
    //The purpose of the payment.

    successRedirectUrl?:string

    //URL to redirect to after successful payment.

    failedRedirectUrl?:string
    //URL to redirect to after failed payment.

    cancelRedirectUrl?:string
    //URL to redirect to after manual cancellation by shopper.

    psp?:number[];
    //List of PSPs to provide for payment. If empty all available PSPs are provied.


    pm?:string[];
    //List of payment mean names to display


    preAuthorization?:boolean
    //Whether charge payment manually at a later date (type authorization)

    chargeOnAuthorization?:boolean
    //preAuthorization needs to be "true". This will charge the authorization during the first payment.

    reservation?:any
    //Whether charge payment manually at a later date (type reservation)

    referenceId?:string
    //An internal reference id used by your system.

    fields?:string
    //The contact data fields which should be stored along with payment

    concardisOrderId?:string
    //Only available for Concardis PSP and if the custom ORDERID option is activated in PSP settings in Payrexx administration. This ORDERID will be transferred to the Payengine.

    skipResultPage?:string
    //Skip result page and directly redirect to success or failed URL

    validity?:number
    //Gateway validity in minutes.

    buttonText?:string
    //Custom pay button text.

    successMessage?:string
    //Custom success message on result page.

    ApiSignature?:any
}

export interface IPayCreation {

    title:string
    //This is the page title which will be shown on the payment page.

    description:string
    //This is a description which will be shown on the payment page.

    psp?:any
    //The psp which should be used for the payment. (Can be an array of integers.)

    referenceId:string
    //An internal reference id used by your system.

    purpose:string
    //The purpose of the payment.

    amount:number
    //The amount of the payment in cents.

    vatRate:number
    //VAT rate percentage (double)

    currency: string
    //The currency of the payment.

    sku?:string
    //Product stock keeping unit

    preAuthorization?:boolean
    //Whether charge payment manually at a later date (type authorization).

    reservation?:any
    //Whether charge payment manually at a later date (type reservation).

    ApiSignature?:any
}

export interface ISubscription {
    userId:string
    //The contact id you got from webhook.

    psp:string
    //The ID of the psp to use.

    amount:string
    //The amount of the payment to fire in cents.

    currency:string
    //The ISO code of the currency of the payment.

    purpose:string
    //The payment purpose. What is the payer paying for?

    paymentInterval:string
    //The payment interval as string. (see PHP documentation of date interval for format)

    period:string
    //The subscription's period as string. (see PHP documentation of date interval for format)

    cancellationInterval:string
    //The interval of cancellation as string. (see PHP documentation of date interval for format)

    referenceId?:string
    //The internal reference id. (Will be sent back with Webhook, can be used as identification)

    ApiSignature?:any
}

declare var require: any
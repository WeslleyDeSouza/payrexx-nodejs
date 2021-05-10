# Payrexx NodeJS SDK

Payrexx NodeJS/TS API Wrapper
https://github.com/WeslleyDeSouza/payrexx-nodejs

## 📦 Installation

<code>
   NPM: npm i --save payrexx@latest
</code>
<br><br>
<code>
   YARN: yarn add payrexx
</code>


#### Documentation

For further information, please refer to the official REST API reference: https://developers.payrexx.com/v1.0/reference

#### Examples

<code>
  import PayRexx from "payrexx";
</code>

### Paylink:
<pre>
       const PayRexx = require('payrexx');

       let PAYR = new PayRexx( auth.instance, auth.secret);
        
       # Create PaymentLink
       const payment = await PAYR.paylink.create({
           "title":       "Item_423",
           "description": "Product_Selling_XY",
           "psp":             1,
           "referenceId": "test",
           "purpose":     "test",
           "amount":        10,
           "vatRate" :      0,
           "currency":     "CHF",
           "sku":           "20.19.03.1",
           "preAuthorization": false,
           "reservation":      0,
       });




       # Load PaymentLink
       const pay2 = await PAYR.payment.get(payment.id)

       # delete created PaymentLink
       const _delete = await payment.delete()


</pre>

### Gateway:
<pre>
    let PAYR = new PayRexx( auth.instance, auth.secret);

    const gateway = await PAYR.gateway.create({
        "amount": 8925,
        "vatRate": 7.7,
        "currency": "CHF",
        "sku": "P01122000",
        "preAuthorization": false,
        "reservation": 0,
        "successRedirectUrl": "https://www.merchant-website.com/success",
        "failedRedirectUrl":  "https://www.merchant-website.com/failed"
    });

</pre>

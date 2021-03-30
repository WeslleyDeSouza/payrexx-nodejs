import PayRexx from "../index";
const auth = require('./credentials.json');

(async (payrexx)=>{

    const {id} = await payrexx.gateway.create({
        "amount": 8925,
        "vatRate": 7.7,
        "currency": "CHF",
        "sku": "P01122000",
        "preAuthorization": false,
        "reservation": 0,
        "successRedirectUrl": "https://www.merchant-website.com/success",
        "failedRedirectUrl":  "https://www.merchant-website.com/failed"
    });

    console.log('gatewayId',id)
    console.log('-----------------------------------------');

    const _get = await payrexx.gateway.get(id)
    console.log(_get)
    console.log('-----------------------------------------');

    const _delete = await payrexx.gateway.delete(id)
    console.log(_delete.status);


})
    (new PayRexx( auth.instance, auth.secret));

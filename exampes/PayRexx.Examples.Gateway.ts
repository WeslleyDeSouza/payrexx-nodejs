import {PayRexx} from "../index";
// Testet 04.06.2020
(async ()=>{
    const auth = require('./credentials.json');

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


    console.log('PAYR.gateway',gateway[0].id)
    console.log('-----------------------------------------');

    const gw = await PAYR.gateway.get(gateway[0].id)
    console.log(gw)
    console.log('-----------------------------------------');

    const result = await PAYR.gateway.delete(gateway[0].id)
    console.log(result.status);


})();

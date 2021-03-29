import {PayRexx} from "../index";
// Testet 04.06.2020
(async ()=>{
    const auth = require('./credentials.json');

    let PAYR = new PayRexx( auth.instance, auth.secret);

    const payment = await PAYR.payment.create({
        "title":       "ABO_123",
        "description": "test",
        "psp":             1,
        "referenceId": "test",
        "purpose":     "test",
        "amount":        10,
        "vatRate" :      0,
        "currency":     "CHF",
        "sku":    "20.19.03.1",
        "preAuthorization": false,
        "reservation":      0,
    });


    console.log('PAYR.payment',payment[0].id)
    console.log('-----------------------------------------');

    const gw = await PAYR.payment.get(payment[0].id)
    console.log(gw)
    console.log('-----------------------------------------');

    const result = await PAYR.payment.delete(payment[0].id)
    console.log(result.status);


})();

import PayRexx from "../index";
const auth = require('./credentials.json');

(async (payrexx)=>{

    const {id} = await payrexx.paylink.create({
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

    console.log('ID:',id)
    console.log('-----------------------------------------');

    const _get = await payrexx.paylink.get(id)
    console.log(_get)
    console.log('-----------------------------------------');

    const _delete = await payrexx.paylink.delete(id)
    console.log(_delete.status);

})
    (new PayRexx( auth.instance, auth.secret));

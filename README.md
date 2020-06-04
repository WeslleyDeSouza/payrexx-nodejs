# Payrexx NodeJS
Payrexx NodeJS/TS API Wrapper


## 📦 Installation
<code>

</code>

## 🔨 Usage

####INIT
<code>
let PAYR = new PayRexx(_instance,_secret);
</code>

#### Payments
<code>
- get
- delete
- create

let id = await PAYR.payment.create({
       "title":       "Test",
       "description": "TestDesc",
       "psp":              1,
       "referenceId": "test",
       "purpose":     "test",
       "amount":          10,
       "vatRate" :         0,
       "currency":     "CHF",
       "sku":    "20.19.03.1",
       "preAuthorization": 0,
       "reservation":      0
       });
       
</code>

#### Gateway

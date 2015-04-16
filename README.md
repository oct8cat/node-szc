[![wercker status](https://app.wercker.com/status/af8c5e803368a5498882e02d77cce5c7/m "wercker status")](https://app.wercker.com/project/bykey/af8c5e803368a5498882e02d77cce5c7)

Trying to try to try to implement [Svyaznoy-Zagruzka services client.](http://docs.zagruzka.com)

* [SMS](#SMS)
* [HLR](#HLR)
* [USSD](#USSD)

SMS <a name="SMS"></a>
=====================

Sending
-------

```js
var Szc = require('szc')
var SMS = new Szc.SMS({serviceId: 42, pass: 'thanksforallthefish'})

var params = {
    clientId: '79012345678',
    message: 'How many roads must a man walk down?'
}

SMS.send(params).then(function(msgId) {
    // Success!
    // msgId is the message's ID on Aggregator's database.
}, function(err) {
    // Handle error.
})
```

HLR <a name="HLR"></a>
======================
. . .

USSD <a name="USSD"></a>
========================
. . .

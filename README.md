# EasyPost Titanium Client

A full featured but simple to use EasyPost Client for Appcelerator Titanium.

## Features
* Verify addresses 
* Get shipping rate quotes
* Compare shipping rates
* Buy postage
* List postage used

## Usage Example

Simply require the easypost module and initiate the easypost.Client with your API key.

All requests are asynchronous, so a callback is required for data handling, as the verify request below shows.

```javascript
var easypost = new (require('easypost').Client)('Your API Key Here', true);

easypost.verify({
    street1: '2100 Sandhill Road',
    city: 'Menlo Park',
    state: 'CA'
}, function(response){
    alert(response);
});
```

## Methods

Here's a list of methods the client supports. For detailed information about all the methods EasyPost's API supports, please visit: 

https://www.geteasypost.com/docs/curl

### verify(params, callback)

Verifies an address.

```javascript
easypost.verify({
    street1: '2100 Sandhill Road',
    city: 'Menlo Park',
    state: 'CA'
}, function(response){
    alert(response);
});
```

EasyPost documentation:
https://www.geteasypost.com/docs/curl#addresses

### rates(params, callback)

Checks shipping rates.

```javascript
easypost.rates({
    to: {
        zip: '94107'
    },
    from: {
        zip: '94019'
    },
    parcel: {
        length: '10.0',
        width: '5.0',
        height: '8.0',
        weight: '100.0'
    }
}, function(response){
    alert(response);
});
```

EasyPost documentation:
https://www.geteasypost.com/docs/curl#postage-rates

### compare(params, callback)

Compares shipping rates. Documentation coming soon.

EasyPost documentation:
https://www.geteasypost.com/docs/curl#postage-rates

### buy(params, callback)

Buys shipping. Documentation coming soon.

EasyPost documentation:
https://www.geteasypost.com/docs/curl#postage-buying

### listAll(callback)

Lists all postage orders. Documentation coming soon.

EasyPost documentation:
https://www.geteasypost.com/docs/curl#postage-lookups
# EasyPost Titanium Client

A full featured but simple to use EasyPost Client for Appcelerator Titanium.

## Features
* Verify addresses 

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

Here's a list of methods the client supports.

### verify(params, callback)

Verifies an address.

### rates(params, callback)

Checks shipping rates.

### compare(params, callback)

Compares shipping rates.

### buy(params, callback)

Buys shipping.

### get(filename, callback)

Gets a filename.

### listAll(callback)

Lists all postage orders.
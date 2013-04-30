# EasyPost Titanium Client

A simple EasyPost client module for Titanium.

## Features
* Verify addresses
* Check postage rates
* Compare postage rates
* Buy postage

## Installation

Simply place easypost.js into your Titanium project, then require it as specified below.

## Usage

```javascript
// require easypost and send API key
var easypost = new (require('easypost').Client)('Your API Key Goes Here');

// verify an address
var response = easypost.verify({
    address: {
        street1: '2100 Sandhill Road',
        city: 'Menlo Park'
    }
});
```
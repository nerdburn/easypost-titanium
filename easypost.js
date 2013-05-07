function Client(apiKey, debug) {
	this.apiKey = apiKey;
	this.baseUrl = 'https://www.geteasypost.com/api';
	this.debug = false;	
	if(typeof debug !== 'undefined') {
		if(debug === true)
			this.debug = true;        
	}
	if(this.debug)
		Ti.API.info('EasyPost: Init with key: ' + this.apiKey);
}
exports.Client = Client;

Client.prototype.setApiKey = function(apiKey) {
    var self = this;
    self.apiKey = apiKey;
    if(self.debug)    
	    Ti.API.info('EasyPost: Setting API key: ' + self.apiKey);
}

Client.prototype.apiUrl = function(type, action) {
    var self = this;
    var url = self.baseUrl + '/' + type + '/' + action;
    if(self.debug)        
	    Ti.API.info('EasyPost: Setting API URL: ' + url);        
    return url;
}

Client.prototype.post = function(url, params, callback) {
    var self = this;
    if(self.debug)        
        Ti.API.info('EasyPost: Init POST with API Key: ' + self.apiKey);
	var xhr = Ti.Network.createHTTPClient({
	    onload: function() {
    	    var response = JSON.parse(this.responseText);
    	    if(self.debug)
                Ti.API.info('EasyPost: Success: ' + JSON.stringify(response));
            callback(response);
    	},
    	onerror: function(e) {
    	    var response = JSON.parse(this.responseText);
    	    if(self.debug)
                Ti.API.info('EasyPost: Error: ' + JSON.stringify(response));
            cb(response);
    	}
	});
	
    var authstr = 'Basic ' + Titanium.Utils.base64encode(self.apiKey+':');
    var data = self.queryString(params);
	
	xhr.open('POST', url);
    xhr.setRequestHeader('Authorization', authstr);
	xhr.send(data);
}

Client.prototype.verify = function(address, cb) {
    var self = this;
    var params = {    
        'address': address
    }
    if(self.debug)        
	    Ti.API.info('EasyPost: Verify: ' + JSON.stringify(address));
    self.post(self.apiUrl('address', 'verify'), params, cb);
}

Client.prototype.rates = function(params, cb) {
    var self = this;
    if(self.debug)    
    	Ti.API.info('EasyPost: Rates: ' + JSON.stringify(params));    
    return self.post(self.apiUrl('postage', 'rates'), params, cb);
}

Client.prototype.compare = function(params, cb) {
    var self = this;
    if(self.debug)    
    	Ti.API.info('EasyPost: Compare: ' + JSON.stringify(params));
    return self.rates(params, cb);
}

Client.prototype.buy = function(params, cb) {
    var self = this;
    if(self.debug)        
	    Ti.API.info('EasyPost: Buy: ' + JSON.stringify(params));    
    return self.post(self.apiUrl('postage', "buy"), params, cb);
}

Client.prototype.get = function(filename, cb) {
    var self = this;
    var params = {
        'label_file_name': filename
    }
    if(self.debug)        
	    Ti.API.info('EasyPost: Get: ' + filename);     
    return self.post(self.apiUrl('postage', "get"), params, cb);
}

Client.prototype.listAll = function(cb) {
    var self = this;
    return self.post(self.apiUrl('postage', "list"), {}, cb);
}

Client.prototype.queryString = function(data) {
    var self = this;   
    for(var key in data) {
        if(typeof data[key] === 'object' && data[key] !== null) 
        {
            var o = data[key];
            delete data[key];
            for(var k in o) {
                var new_key = key + "[" + k + "]"
                data[new_key] = o[k]
            }
        }
    }
    var arr = []; 
    for(key in data)
        arr.push(key + '=' + data[key]);
    return arr.join("&");
}

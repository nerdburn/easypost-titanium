function Client(apiKey) {
	this.apiKey = apiKey;
	this.baseUrl = 'https://www.geteasypost.com/api';
	Ti.API.info('EasyPost: Init with key: ' + this.apiKey);
}
exports.Client = Client;

Client.prototype.setApiKey = function(apiKey) {
    var self = this;
    self.apiKey = apiKey;
	Ti.API.info('EasyPost: Setting API key: ' + self.apiKey);
}

Client.prototype.apiUrl = function(type, action) {
    var self = this;
    var url = self.baseUrl + '/' + type + '/' + action;
	Ti.API.info('EasyPost: Setting API URL: ' + url);        
    return url;
}

Client.prototype.post = function(url, params) {
    var self = this;
    Ti.API.info('EasyPost: Init POST with API Key: ' + self.apiKey);
	var xhr = Ti.Network.createHTTPClient({
	    onload: function() {
    	    var response = JSON.parse(this.responseText);
            Ti.API.info('EasyPost: Response: ' + response.success);
            return response;
    	},
    	onerror: function(e) {
    	    var response = JSON.parse(this.responseText);
            Ti.API.info('EasyPost: Response: ' + response.error); 
            return response;	    
    	}
	});	
	
	Ti.API.info('EasyPost: Url: ' + url);
	Ti.API.info('EasyPost: Params: ' + JSON.stringify(params));
	
    var authstr = 'Basic ' + Titanium.Utils.base64encode(self.apiKey+':');
	
	xhr.open('POST', url);
    xhr.setRequestHeader('Authorization', authstr);
	xhr.send({
	    address: {
	        street: '2100 Sand Hill Road',
	        city: 'Menlo Park'
	    }
	});
}

Client.prototype.verify = function(address) {
    var self = this;
    var params = {    
        'address': address
    }
	Ti.API.info('EasyPost: Verify: ' + address);
    return self.post(self.apiUrl('address', 'verify'), params);
}

Client.prototype.rates = function(params) {
    var self = this;
	Ti.API.info('EasyPost: Rates: ' + JSON.stringify(params));    
    return self.post(self.apiUrl('postage', 'rates'), params);
}

Client.prototype.compare = function(params) {
    var self = this;
	Ti.API.info('EasyPost: Compare: ' + JSON.stringify(params));
    return self.rates(params);
}

Client.prototype.buy = function(params) {
    var self = this;
	Ti.API.info('EasyPost: Buy: ' + JSON.stringify(params));    
    return self.post(self.apiUrl('postage', "buy"), params);
}

Client.prototype.get = function(filename) {
    var self = this;
    var params = {
        'label_file_name': filename
    }
	Ti.API.info('EasyPost: Get: ' + filename);     
    return self.post(self.apiUrl('postage', "get"), params);
}

Client.prototype.listAll = function() {
    var self = this;
    return self.post(self.apiUrl('postage', "list"), {});
}
var request = require('request');
var _ = require('underscore');
var slide = require('slide');
var oxcolumns = require('./oxcolumns');

var oxuri = 'http://devel-apache.netline.de/ajax';
var user = 'mario.scheliga@premium';
var pass = 'secret';


var InfoStoreSync = function () {


};

InfoStoreSync.prototype.api = function (options, callback) {
  var self = this,
    headers = options.headers || {};
  
  options.parseJSON = (typeof options.parseJSON === 'undefined') ? true : options.parseJSON;
  headers['Content-Type'] = headers['Content-Type'] || 'application/x-www-form-urlencoded';


  var columns = false;
  if (options.params && options.params.columns) {
    // naive implemenation
    columns = options.params.columns;
    options.params.columns = oxcolumns.toColumns(options.module, options.params.columns);
  }

  var params = [];
  if (options.params) {
    for(var i in options.params) {
      if(options.params.hasOwnProperty(i)) {
        params.push(i + '=' + options.params[i]);
      }
    }
  }

  if (self.session) {
    params.push('session='+self.session);
  }

  


  if (self.cookies) {
    headers['Cookie'] = self.cookies.join('; ');
  }

  var url = self.endpoint + '/' + options.module + ((params.length > 0)?'?' + params.join('&'):'');
  console.log(url);
  request({
    url: self.endpoint + '/' + options.module + ((params.length > 0)?'?' + params.join('&'):''),
    method: options.method || 'GET',
    body: options.body || '',
    headers: headers
  
  }, function (err, resp) {
    if (err) {
      return callback(err, null);
    }
    var ret = {
      headers: resp.headers,
      body: resp.body
    };
    if(options.parseJSON) {
      ret.body = JSON.parse(ret.body);
    }

    if(columns) {
      // translate it back
      console.log("TRANSLATE");
      ret.body.data = oxcolumns.toFields(options.module, ret.body.data, oxcolumns.toColumns(options.module,columns));
    }

    return callback(null, ret);
  });
};

InfoStoreSync.prototype.login = function (endpoint, user, pass, callback) {
  var self = this;
  self.endpoint = endpoint;
  self.user = user;
  self.pass = pass;
  self.config = null;

  self.api({
    module: 'login',
    params: {
      action: 'login'
    },
    method: 'POST',
    body: 'name='+user+'&password='+pass,
  }, function (err, resp) {
    if (err) {
      return callback(err, null);
    }
    self.session = resp.body.session;
    self.random = resp.body.random;

    var setcookies = resp.headers['set-cookie'];
    var cookies = [];
    setcookies.forEach(function (cookie) {
      var parts = cookie.split(';')[0].split('=');
      cookies.push(parts[0].trim() + '=' + ( parts[ 1 ] || '' ).trim());
    });
    self.cookies = cookies;

    return self.loadConfig(callback);
  });

};

InfoStoreSync.prototype.logout = function (callback) {
  var self = this;
  self.api({module: 'login', params: { action: 'logout'}, parseJSON: false}, callback);
};


InfoStoreSync.prototype.loadConfig = function (callback) {
  var self = this;
  self.api({module: 'config'}, function (err, data) {
    if (err) {
      return callback(err, null);
    }

    self.config = data.body.data;
    return callback(null, self.config);
  
  });
};







var b = new InfoStoreSync();


/*var firstChain = [];
firstChain.push([b, 'login', oxuri, user, pass]);
firstChain.push([b, 'logout']);

slide.chain(firstChain, function (err, results) {
  console.log(results);
});*/



b.login(oxuri, user, pass, function (err, config) {
  if (err) {
    throw err;
  }

  b.api({
    module: 'folders',
    params: {
      action: 'list',
      parent: b.config.folder.infostore,
      columns: 'id,creation_date,last_modified,type,total,new,unread,title,subfolders',
      all: 1,
      allowed_modules: ['infostore']
    }
  }, function (err, data) {
    if(err) {
      throw err;
    }

    console.log(data.body);
  
  });

  /*b.api({
    path: '/infostore',
    params: {
      action: 'all',
      folder: b.config.folder.infostore,
      columns: '700,701,702,703,704,705,710,711'
    }
  }, function (err, data) {
    console.log(data.body);
  
  });*/

});


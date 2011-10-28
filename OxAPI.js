var request = require('request');
var _ = require('underscore');
var chain = require('slide').chain;
var asyncMap = require('slide').asyncMap;
var oxcolumns = require('./oxcolumns');



var OxAPI = function () {


};

OxAPI.prototype.api = function (options, callback) {
  var self = this,
    headers = options.headers || {};
  
  options.raw = options.raw;
  headers['Content-Type'] = headers['Content-Type'] || 'application/x-www-form-urlencoded';


  var columns = false;
  if (options.params && options.params.columns) {
    // naive implemenation
    columns = options.params.columns;
    options.params.columns = oxcolumns.toColumns(options.module, options.params.columns);
    console.log(options.params.columns);
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

  var url = self.endpoint + '/' + options.module +( (options.path)?options.path:'') + ((params.length > 0)?'?' + params.join('&'):'');
  console.log(url);
  request({
    url: self.endpoint + '/' + options.module + ((options.path)?options.path:'')+ ((params.length > 0)?'?' + params.join('&'):''),
    method: options.method || 'GET',
    body: options.body || '',
    headers: headers,
    encoding: 'utf8'
  
  }, function (err, resp) {
    if (err) {
      return callback(err, null);
    }
    var ret = {
      headers: resp.headers,
      body: resp.body
    };
    if(!options.raw) {
      ret.body = JSON.parse(ret.body);
    }

    if(columns) {
      // translate it back
      ret.body.data = oxcolumns.toFields(options.module, ret.body.data, oxcolumns.toColumns(options.module,columns));
    }

    return callback(null, ret);
  });
};

OxAPI.prototype.login = function (endpoint, user, pass, callback) {
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
  }, function onlogin(err, resp) {
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

OxAPI.prototype.logout = function (callback) {
  var self = this;
  callback = callback || function (){};
  self.api({module: 'login', params: { action: 'logout'}, raw: true}, callback);
};


OxAPI.prototype.loadConfig = function (callback) {
  var self = this;
  self.api({module: 'config'}, function (err, data) {
    if (err) {
      return callback(err, null);
    }
    self.config = data.body.data;
    return callback(null, self.config);
  
  });
};

OxAPI.prototype.listFolders = function (parents, columns, callback) {
  var self = this;
  
  asyncMap(parents, function (parent, cb) {
    self.api({
      module: 'folders',
      params: {
        action: 'list',
        parent: parent,
        columns: columns,
        all: 1
      }
    }, cb);
  }, function (err, results) {
    if (err) {
      return callback(err, null);
    }
    var ret = {};
    _.each(results, function (result) {
      // body & header here
      ret[result.body.data[0].folder_id] = result.body
    });
    callback(null, ret);
  });
};

OxAPI.prototype.getFolderTree = function (folder_ids, columns, callback) {
  var self = this;
  self.listFolders(folder_ids, columns, function (err, folders) {
    if (err) {
      return callback(err, null);
    }

    var nextSubs = [];
    _.each(folders, function (subfolders) {
      var subs = _.pluck(_.filter(subfolders.data, function (folder) {
        if (folder.subfolders === true) {
          return folder.id
        };
        return null;
      }),'id');
      nextSubs = nextSubs.concat(subs);
    });

    nextSubs = _.uniq(nextSubs);
    if (nextSubs.length > 0) {
      // recursive ? not so good cause optimization does not work here
      self.getFolderTree(nextSubs, columns, function (err, subfolder) {
        if (err) {
          return callback(err, null);
        }
        _.each(folders, function (folder) {
          _.each(folder.data, function (sub, index) {
            if(subfolder[sub.id]) {
              sub.subfolder = subfolder[sub.id];
            }
          });
        });
        return callback(null, folders);
      });
    } else {
      // a leave directory cool
      return callback(null, folders);
    }
  });
};
OxAPI.prototype.getFolderFiles = function (folder_id, columns, callback) {
  var self = this;

  self.api({
    module: 'infostore',
    params: {
      action: 'all',
      folder: folder_id,
      columns: columns
    }
  }, callback);
};

OxAPI.prototype.downloadFile = function (filename, folder_id, item_id, callback) {
  var self = this;
  self.api({
    module: 'infostore',
    raw: true,
    /*path: '/' + filename,*/
    params: {
      action: 'document',
      folder: folder_id,
      id: item_id
    }
  }, callback);
};
OxAPI.prototype.multiple = function (cmds, callback) {
  var self = this;
  self.api({
    module: 'multiple',
    raw: true,
    params: {
      continue: 'true'
    },
    method: 'PUT',
    body: JSON.stringify(cmds)
  }, callback);
};



exports = module.exports = OxAPI;

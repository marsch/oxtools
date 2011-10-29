var request = require('request');
var _ = require('underscore');
var OxAPI = require('./OxAPI');
var asyncMap = require('slide').asyncMap;
var chain = require('slide').chain;
var utils = require('./utils');

var oxuri = 'http://devel-apache.netline.de/ajax';
var user = 'mario.scheliga@premium';
var pass = 'secret';

console.log(utils);

var EclipseCon = function () {
  this.sessionURL = 'http://www.eclipsecon.org/europe2011/json/sessions';
  this.speakerURL = 'http://www.eclipsecon.org/europe2011/json/speakers';
  this.oxuri = 'http://devel-apache.netline.de/ajax';
  this.oxuser = 'mario.scheliga@premium';
  this.oxpass = 'secret';
};


EclipseCon.prototype.init = function (callback) {
  var self = this;
  chain([
    [self,'load'],
    [self,'login']
  ], callback);
};

EclipseCon.prototype.load = function (callback) {
  var self = this;
  var urls = [self.sessionURL, self.speakerURL];
  console.log(urls);
  asyncMap(urls, function (fetchURL, cb) {
    console.log(fetchURL);
    request({
      url: fetchURL,
      method: 'GET'
    }, cb);
  }, function (err, results) {
    if (err) {
      throw err;
    }
    _.each(results, function (res) {
      if (res.request.uri.href === self.speakerURL) {
        self.speakersData = JSON.parse(res.body);
      }
      if (res.request.uri.href === self.sessionURL) {
        self.sessionsData = JSON.parse(res.body);
      }
    });
    return callback(null, true);
  });
};

EclipseCon.prototype.login = function (callback) {
  var self = this;
  self.ox = new OxAPI();
  self.ox.login(self.oxuri, self.oxuser, self.oxpass, callback);
};

EclipseCon.prototype.import = function (callback) {
  var self = this,
    cmd = [];
    var i =  0;
  _.each(self.sessionsData, function (session) {
    var start = (new Date(session.date + ' ' + session.start).getTime());
    var end =  (new Date(session.date + ' ' + session.end).getTime());

    if (start > end) {
      end += (60 * 60 * 24 * 1000);
    }
    if (start > end) {
      throw 'ähh?';
    }
    var note = session.abstract;
    note = utils.nl2br(note);
    note = note.replace(/(\r\n|\n|\r)/gm,"");
    note = utils.strip_tags(note);
    console.log(JSON.stringify(note));
    cmd.push({
      module: 'calendar',
      action: 'new',
      data: {
        title: session.title+"",
        note: note,
        start_date: start,
        end_date: end,
        folder_id: self.ox.config.folder.calendar,
        location: session.room,
        categories: session.category
      }
    });
  });

  //console.log(cmd);
  
  self.ox.multiple(cmd, function (err, data) {
    if (err) {
      throw err;
    }
    return callback(null, data);
  });
};

var e = new EclipseCon();
e.init(function (err, ok) {
  e.import(function (err, data) {
    if (err) {
      throw err;
    }
    console.log(data);
  });
});

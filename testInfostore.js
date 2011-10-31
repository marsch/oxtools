var request = require('request');
var _ = require('underscore');
var chain = require('slide').chain;
var asyncMap = require('slide').asyncMap;

var oxuri = 'http://devel-apache.netline.de/ajax';
var user = 'mario.scheliga@premium';
var pass = 'secret';
var OxAPI = require('./OxAPI');


var b = new OxAPI();


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

  b.getFolderFiles(
    b.config.folder.infostore,
    'id,created_by,modified_by,creation_date,last_modified,folder_id,title,url,filename,file_size,version,current_version,number_of_versions',
    function (err, result) {

      console.log(result.body.data);

      /*b.uploadPatchFile('Ext_JS_3.0_Cookbook_[eBook]_30102009_112920.delta', '9302', '5009', function (err, results) {
        if (err) {
          throw err;
        }
        console.log(results);
        b.logout(function (err, ok) {
          if (err) {
            throw err;
          } 
          console.log("successfullly logged out");
        });
      });*/
      b.downloadSigFile('Ext_JS_3.0_Cookbook_[eBook]_30102009_112920.pdf', '9302', '5009', function (err, results) {
        if (err) {
          throw err;
        }
        b.logout(function (err, ok) {
          if (err) {
            throw err;
          } 
          console.log("successfullly logged out");
        });
      });



      /*b.downloadDeltaFile('changed.sig', '9302', '5009', function (err, results) {
        if (err) {
          throw err;
        }
        b.logout(function (err, ok) {
          if (err) {
            throw err;
          } 
          console.log("successfullly logged out");
        });
      });*/
    /*b.downloadFile("Ext_JS_3.0_Cookbook_[eBook]_30102009_112920.pdf", '9302', '5009', function (err, results) {
      if (err) {
        throw err;
      }
      b.logout(function (err, ok) {
        if (err) {
          throw err;
        } 
        console.log("successfullly logged out");
      });
    });
    */



    
  });

  //console.log(config);
  /*b.getFolderTree(
    [b.config.folder.infostore],
    'id,creation_date,last_modified,type,total,new,unread,title,subfolders,folder_id',
    function (err, results) {
      console.log(results[b.config.folder.infostore].data);


      b.logout(function (err, ok) {
        if (err) {
          throw err;
        } 
        console.log("successfullly logged out");
      
      });
    }
  );*/
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


var util = require('util'),
    child = require('child_process'),
    slide = require('slide')
    fs = require('fs');


var Rdiff = function () {
  this.rdiffcmd = 'rdiff';
};

Rdiff.prototype.exec = function (cmd, args) {
  console.log("exec :" + cmd);
  var options = { 
    cwd: undefined,
    env: process.env,
    customFds: [-1, -1, -1] 
  };
  var c = child.spawn(cmd, args, options);
  return c;
}

Rdiff.prototype.getSignature = function (filename) {
  var self = this;
  return self.exec(self.rdiffcmd, ['signature', filename]).stdout;
};

Rdiff.prototype.getDelta = function (sigFilename, newerFilename) {
  var self = this;
  return self.exec(self.rdiffcmd, ['delta', sigFilename, newerFilename]).stdout;
};

Rdiff.prototype.patch = function (baseFilename, deltaFilename) {
  var self = this;
  return self.exec([self.rdiffcmd, 'patch', baseFilename,deltaFilename]).stdout;
};

var a = new Rdiff();
var sig = a.getSignature('Ext_JS_3.0_Cookbook_[eBook]_30102009_112920.pdf');
sig.setEncoding('binary');
sig.pipe(fs.createWriteStream('ext.sig',  {encoding: 'binary'}));
sig.on('end', function () {
  console.log("sig generated");
  var delta = a.getDelta('ext.sig', 'Ext_JS_3.0_Cookbook_[eBook]_30102009_112920.pdf');
  delta.setEncoding('binary');
  delta.pipe(fs.createWriteStream('test.delta', {encoding: 'binary'}));
  delta.on('end', function () {
    console.log("delta generated");
    var patch = a.patch('empty', 'test.delta');
    patch.setEndoding('binary');
    patch.pipe(fs.createWriteStream('test.patched.pdf',  {encoding: 'binary'}));
    patch.on('end', function () {
      console.log('patched successfully');
    
    });
  });
});


/*var cmdsig = 'rdiff signature OX7.key > OX7.sig';
var cmddelta = 'rdiff delta OX7.sig OX7_newer.key OX7.delta';
var cmdpatch = 'rdiff patch OX7.key OX7.delta OX7.patched.key';
   

var cmdchain = [
  [child, "exec", cmdsig],
  [child, "exec", cmddelta],
  [child, "exec", cmdpatch]
];

slide.chain(cmdchain, function (err, results) {
  if (err) {
    throw err;
  }

  console.log(results);
});*/

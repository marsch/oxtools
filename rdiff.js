var util = require('util'),
    child = require('child_process'),
    slide = require('slide');


var cmdsig = 'rdiff signature OX7.key > OX7.sig';
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
});

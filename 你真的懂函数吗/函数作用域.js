var a = 1;
var x = function () {
  console.log(a);
};

function f() {
  var a = 2;
  x();
}

f()
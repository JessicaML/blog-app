var cars = ['fiat', 'mercedes', 'bmw', 'audi'];
var longeststring;
for (var i = 1; i <= cars.length - 1; i++) {


 if (cars[i].length > cars[i - 1].length) {
    longeststring = cars[i];
  }
}
console.log(longeststring);


var cars = ['fiat', 'bmw', 'mercedes', 'audi'];
var longeststring;
for (var i = 1; i <= cars.length - 1; i++) {


 if (cars[i].length > cars[i - 1].length) {
    longeststring = cars[i];
  }
}
console.log(longeststring);

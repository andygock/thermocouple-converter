// Unit tests for mocha
var Thermocouple = require("../Thermocouple");
var test = require("unit.js");

// Expected conversion results, extracted from ITS-90 tables
// ref: https://srdata.nist.gov/its90/main/
// array element format: [ type, mv, degc ]
var results = [
  ["b", 0.787, 400],
  ["b", 3.154, 800],
  ["b", 6.786, 1200],
  ["b", 11.263, 1600],

  ["e", -8.825, -200],
  ["e", 0, 0],
  ["e", 28.946, 400],
  ["e", 61.017, 800],

  ["j", -7.89, -200],
  ["j", 0, 0],
  ["j", 21.848, 400],
  ["j", 45.494, 800],
  ["j", 69.553, 1200],

  ["k", -5.891, -200],
  ["k", 0, 0],
  ["k", 4.096, 100],
  ["k", 8.138, 200],
  ["k", 12.209, 300],
  ["k", 16.397, 400],
  ["k", 33.275, 800],
  ["k", 48.838, 1200],

  ["n", -3.99, -200],
  ["n", 0, 0],
  ["n", 12.974, 400],
  ["n", 28.455, 800],
  ["n", 43.846, 1200],

  ["r", 0, 0],
  ["r", 3.408, 400],
  ["r", 7.95, 800],
  ["r", 13.228, 1200],
  ["r", 18.849, 1600],

  ["s", 0, 0],
  ["s", 3.259, 400],
  ["s", 7.345, 800],
  ["s", 11.951, 1200],
  ["s", 16.777, 1600],

  ["t", -5.603, -200],
  ["t", 0, 0],
  ["t", 20.872, 400],
];

// Test actual conversions, compare results to ITS-90 tables
describe("Conversions (both directions)", function () {
  results.forEach(function (e) {
    var type = e[0];
    var mv = e[1];
    var temp = e[2];
    it("Type " + type.toUpperCase() + " @ " + temp + " degC", function () {
      const res = Thermocouple.convert(mv, { type: type, input: "mv" });
      // console.log(`${mv} mV = ${res} degC`)

      // voltage to temp, temp should be within 0.15 degC
      test
        .number(Thermocouple.convert(mv, { type: type, input: "mv" }))
        .isApprox(temp, 0.15);

      // temp to voltage, voltage should be 0.001mV
      test
        .number(Thermocouple.convert(temp, { type: type, input: "degc" }))
        .isApprox(mv, 0.001);
    });
  });
});

// Test various invalid inputs
describe("Exception triggers", function () {
  it("String input", function () {
    test
      .exception(function () {
        Thermocouple.convert("string", { type: "k", input: "mv" });
      })
      .isInstanceOf(TypeError);
    test
      .exception(function () {
        Thermocouple.convert("string", { type: "k", input: "degc" });
      })
      .isInstanceOf(TypeError);
  });

  it("Out of range numeric input", function () {
    test
      .exception(function () {
        Thermocouple.convert(123456, { type: "k", input: "mv" });
      })
      .isInstanceOf(RangeError);
    test
      .exception(function () {
        Thermocouple.convert(123456, { type: "k", input: "degc" });
      })
      .isInstanceOf(RangeError);
  });
});

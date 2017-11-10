// Unit tests for mocha
var Thermocouple = require('../Thermocouple');
var test = require('unit.js');

// Expected conversion results, extracted from ITS-90 tables
// ref: https://srdata.nist.gov/its90/main/
// array element format: [ type, mv, degc ]
var results = [
    ['b', 0.787,  400],
    ['b', 3.154,  800],
    ['b', 6.786,  1200],
    ['b', 11.263, 1600],

    ['e', -8.825, -200],
    ['e', 0,      0],
    ['e', 28.946, 400],
    ['e', 61.017, 800],

    ['j', -7.890, -200],
    ['j', 0,      0],
    ['j', 21.848, 400],
    ['j', 45.494, 800],
    ['j', 69.553, 1200],

    ['k', -5.891, -200],
    ['k', 0,      0],
    ['k', 16.397, 400],
    ['k', 33.275, 800],
    ['k', 48.838, 1200],

    ['n', -3.990, -200],
    ['n', 0,      0],
    ['n', 12.974, 400],
    ['n', 28.455, 800],
    ['n', 43.846, 1200],

    ['r', 0,      0],
    ['r', 3.408,  400],
    ['r', 7.950,  800],
    ['r', 13.228, 1200],
    ['r', 18.849, 1600],

    ['s', 0,      0],
    ['s', 3.259,  400],
    ['s', 7.345,  800],
    ['s', 11.951, 1200],
    ['s', 16.777, 1600],

    ['t', -5.603, -200],
    ['t', 0,      0],
    ['t', 20.872, 400],
]

// Test actual conversions, compare results to ITS-90 tables
describe('Conversions (both directions)', function() {
    results.forEach(function(e) {
        var type = e[0];
        var mv = e[1];
        var temp = e[2];
        it('Type ' + type.toUpperCase() + " @ " + temp + " degC", function() {
            test.number(Thermocouple.convert(mv, { type: type, input: 'mv' })).isApprox(temp, 0.2);
            test.number(Thermocouple.convert(temp, { type: type, input: 'degc' })).isApprox(mv, 0.01);
        });
    })
});

// Test various invalid inputs
describe("Exception triggers", function() {

    it("String input", function() {
        test.exception(function () {
            Thermocouple.convert("string", { type: "k", input: 'mv' })
        }).hasValue("InvalidInput");
        test.exception(function () {
            Thermocouple.convert("string", { type: "k", input: 'degc' })
        }).hasValue("InvalidInput");
    });

    it("Out of range numeric input", function () {
        test.exception(function () {
            Thermocouple.convert(123456, { type: "k", input: 'mv' })
        }).hasValue("OutOfRange");
        test.exception(function () {
            Thermocouple.convert(123456, { type: "k", input: 'degc' })
        }).hasValue("OutOfRange");
    });

});

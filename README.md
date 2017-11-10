# Thermocouple.js

A JavaScript module for thermocouple voltage to temperature conversions. Based on the [Python script](https://github.com/andygock/Thermocouple) I wrote of the same function.

Uses polynomial functions with [NIST thermocouple tables and coefficients](http://srdata.nist.gov/its90/main/).

- Supports thermocouples of types B, E, J, K, N, R, S, T
- All voltage is measured in millivolts (mV)
- All temperature measurements are in degrees Celcius

No warranty given or implied whatsoever with this tool. Use at your own risk.

## Installation

### With NodeJS (production)

Create `sample.js`:

```js
// Convert type K 4 mv to degc
var Thermocouple = require('thermocouple-converter');
var result = Thermocouple.convert(4.0, { type: 'k', input: 'mv' });
console.log(result);
```

Install package with `npm` (remove `--production` to install devDependencies):

    npm install thermocouple-converter --production

Run command to give result of `97.64` degrees:

    $ node test-tc.js
    97.64306383175676

## Conversion function format

```js
Thermocouple.convert(INPUT_VAL, { type: TYPE, input: TC_TYPE });
```

Parameters:

- `INPUT_VAL` - input value to be converted
- `TYPE` - single alpha character denoting thermocouple type
- `TC_TYPE` - `mv` or `degc` designating `INPUT_VAL`'s units. Determines conversion direction.

If no parameters are supplied, `k` (Type K) and `mv` is used as default. This results in Type K millivolts conversion to degrees Celcius.

## Examples

Convert `4.0` millivolts from type K thermocouple to temperature.

```js
var result = Thermocouple.convert(4.0, { type: 'k', input: 'mv' });
```

Convert `100.0` degrees C to type K thermocouple millivolts.

```js
var result = Thermocouple.convert(100.0, { type: 'k', input: 'degc' });
```

## Usage on a web site

Load script with `<script>` tag:

```html
<script src="Thermocouple.js"></script>
```

Execute custom conversion as normal JS, for example, insert this inside your `<body>`:

```html
<div id="result"></div>
<script>
    var result = Thermocouple.convert(4.0, { type: 'k', input: 'mv' });
    document.querySelector('#result').innerHTML = result;
</script>
```

For a working example, view the static HTML page in `test/test.html` or live at <https://andygock.github.io/thermocouple-converter/>

## Development

Download source

    git clone https://github.com/andygock/thermocouple-converter
    cd thermocouple-converter

Install dependencies

    npm install

Run unit tests

    npm test

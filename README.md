# Thermocouple.js

A JavaScript module for thermocouple voltage to temperature conversions. Based on the [Python script](https://github.com/andygock/Thermocouple) I wrote of the same function.

Uses polynomial functions with [NIST thermocouple tables and coefficients](http://srdata.nist.gov/its90/main/).

- Supports thermocouples of types B, E, J, K, N, R, S, T
- All voltage is measured in millivolts (mV)
- All temperature measurements are in degrees Celcius

No warranty given or implied whatsoever with this tool. Use at your own risk.

## Usage

    Thermocouple.convert(INPUT, { type: TYPE, input: INPUT' });

Parameters:

- `INPUT` - input value to be converted
- `TYPE` - single alpha character denoting thermocouple type
- `INPUT` - `mv` or `degc` designating `INPUT` units. Determines conversion direction.

If no parameters are supplied, `k` (Type K) and `mv` is used as default. This results in Type K millivolts conversion to degrees Celcius.

## Examples

Convert `4.0` millivolts from type K thermocouple to temperature.

    Thermocouple.convert(4.0, { type: 'k', input: 'mv' });

Convert `100.0` degrees C to type K thermocouple millivolts.

    Thermocouple.convert(100.0, { type: 'k', input: 'degc' });

## Using on web site

Load script with `<script>` tag:

    <script src="Thermocouple.js"></script>

Execute custom conversion as normal JS, for example, insert this inside your `<body>`:

    <div id="result"></div>
    <script>
         var result = Thermocouple.convert(4.0, { type: 'k', input: 'mv' });
         document.querySelector('#result').innerHTML = result;
    </script>

For a working example, view the static HTML page in `example/test.html`

## Development

Run unit tests

    mocha Test

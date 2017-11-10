var Thermocouple = (function() {

    return {

        // min/max temp and mv values per thermocouple type - not used at the moment
        range: {
            'b': {
                t: { min: 0, max: 1820 },
                v: { min: 0.291, max: 13.820 }
            },
            'e': {
                t: { min: -270, max: 1000 },
                v: { min: -8.825, max: 76.373 }
            },
            'j': {
                t: { min: -210, max: 1200 },
                v: { min: -8.095, max: 69.553 }
            },
            'k': {
                t: { min: -270, max: 1372 },
                v: { min: -5.891, max: 54.886 }
            },
            'n': {
                t: { min: -270, max: 1300 },
                v: { min: -3.99, max: 47.513 }
            },
            'r': {
                t: { min: -50, max: 1768.1 },
                v: { min: -0.226, max: 21.103 }
            },
            's': {
                t: { min: -50, max: 1768.1 },
                v: { min: -0.235, max: 18.693 }
            },
            't': {
                t: { min: -270, max: 400 },
                v: { min: -5.603, max: 20.872 }
            }
        },

        // only these thermocouple types are supported
        supported_types: [ 'b', 'e', 'j', 'k', 'n', 'r', 's', 't' ],

        // converter functions
        converter: {

            // degrees C to type B millivolts
            to_type_b: function(degc) {
                var c;
                var tab1 = [
                    0.000000000000E+00,
                    -0.246508183460E-03,
                    0.590404211710E-05,
                    -0.132579316360E-08,
                    0.156682919010E-11,
                    -0.169445292400E-14,
                    0.629903470940E-18,
                ];
                var tab2 = [
                    -0.389381686210E+01,
                    0.285717474700E-01,
                    -0.848851047850E-04,
                    0.157852801640E-06,
                    -0.168353448640E-09,
                    0.111097940130E-12,
                    -0.445154310330E-16,
                    0.989756408210E-20,
                    -0.937913302890E-24,
                ];
                if (degc >= 0 && degc <= 630.615) {
                    c = tab1;
                } else if (degc > 630.615 && degc <= 1820) {
                    c = tab2;
                } else {
                    throw { name: "OutOfRange", message: "Temperature specified is out of range for Type B thermocouple" };
                }
                var e = 0;
                for (var p = 0; p < c.length; p++) {
                    e += c[p] * Math.pow(degc, p);
                }

                return e;
            },

            // type B millivolts to degrees C
            from_type_b: function(mv) {
                var c;
                var tab1 = [
                    9.8423321E+01,
                    6.9971500E+02,
                    -8.4765304E+02,
                    1.0052644E+03,
                    -8.3345952E+02,
                    4.5508542E+02,
                    -1.5523037E+02,
                    2.9886750E+01,
                    -2.4742860E+00,
                ];
                var tab2 = [
                    2.1315071E+02,
                    2.8510504E+02,
                    -5.2742887E+01,
                    9.9160804E+00,
                    -1.2965303E+00,
                    1.1195870E-01,
                    -6.0625199E-03,
                    1.8661696E-04,
                    -2.4878585E-06,
                ];
                if (mv >= 0.291 && mv <= 2.431) {
                    c = tab1;
                } else if (mv > 2.431 && mv <= 13.820) {
                    c = tab2;
                } else {
                    throw { name: "OutOfRange", message: "Voltage specified is out of range for Type B thermocouple" };
                }
                var t = 0.0;
                for (var p = 0; p < c.length; p++) {
                    t += c[p] * Math.pow(mv, p);
                }

                return t;
            },

            // degrees C to type E millivolts
            to_type_e: function (degc) {
                var c;
                var tab1 = [
                    0.000000000000E+00,
                    0.586655087080E-01,
                    0.454109771240E-04,
                    -0.779980486860E-06,
                    -0.258001608430E-07,
                    -0.594525830570E-09,
                    -0.932140586670E-11,
                    -0.102876055340E-12,
                    -0.803701236210E-15,
                    -0.439794973910E-17,
                    -0.164147763550E-19,
                    -0.396736195160E-22,
                    -0.558273287210E-25,
                    -0.346578420130E-28,
                ];
                var tab2 = [
                    0.000000000000E+00,
                    0.586655087100E-01,
                    0.450322755820E-04,
                    0.289084072120E-07,
                    -0.330568966520E-09,
                    0.650244032700E-12,
                    -0.191974955040E-15,
                    -0.125366004970E-17,
                    0.214892175690E-20,
                    -0.143880417820E-23,
                    0.359608994810E-27,
                ];
                if (degc >= -270 && degc <= 0) {
                    c = tab1;
                } else if (degc > 0 && degc <= 1000) {
                    c = tab2;
                } else {
                    throw { name: "OutOfRange", message: "Temperature specified is out of range for Type E thermocouple" };
                }
                var e = 0;
                for (var p = 0; p < c.length; p++) {
                    e += c[p] * Math.pow(degc, p);
                }

                return e;
            },

            // type E millivolts to degrees C
            from_type_e: function (mv) {
                var c;
                var tab1 = [
                    0.0000000E+00,
                    1.6977288E+01,
                    -4.3514970E-01,
                    -1.5859697E-01,
                    -9.2502871E-02,
                    -2.6084314E-02,
                    -4.1360199E-03,
                    -3.4034030E-04,
                    -1.1564890E-05,
                    0.0000000E+00,
                ];
                var tab2 = [
                    0.0000000E+00,
                    1.7057035E+01,
                    -2.3301759E-01,
                    6.5435585E-03,
                    -7.3562749E-05,
                    -1.7896001E-06,
                    8.4036165E-08,
                    -1.3735879E-09,
                    1.0629823E-11,
                    -3.2447087E-14,
                ];
                if (mv >= -8.825 && mv <= 0.0) {
                    c = tab1;
                } else if (mv > 0.0 && mv <= 76.373) {
                    c = tab2;
                } else {
                    throw { name: "OutOfRange", message: "Voltage specified is out of range for Type E thermocouple" };
                }
                var t = 0.0;
                for (var p = 0; p < c.length; p++) {
                    t += c[p] * Math.pow(mv, p);
                }

                return t;
            },

            // degrees C to type J millivolts
            to_type_j: function (degc) {
                var c;
                var tab1 = [
                    0.000000000000E+00,
                    0.503811878150E-01,
                    0.304758369300E-04,
                    -0.856810657200E-07,
                    0.132281952950E-09,
                    -0.170529583370E-12,
                    0.209480906970E-15,
                    -0.125383953360E-18,
                    0.156317256970E-22,
                ];
                var tab2 = [
                    0.296456256810E+03,
                    -0.149761277860E+01,
                    0.317871039240E-02,
                    -0.318476867010E-05,
                    0.157208190040E-08,
                    -0.306913690560E-12,
                ];

                if (degc >= -210 && degc <= 760) {
                    c = tab1;
                } else if (degc > 760 && degc <= 1200) {
                    c = tab2;
                } else {
                    throw { name: "OutOfRange", message: "Temperature specified is out of range for Type J thermocouple" };
                }
                var e = 0;
                for (var p = 0; p < c.length; p++) {
                    e += c[p] * Math.pow(degc, p);
                }

                return e;
            },

            // type J millivolts to degrees C
            from_type_j: function (mv) {
                var c;
                var tab1 = [
                    0.0000000E+00,
                    1.9528268E+01,
                    -1.2286185E+00,
                    -1.0752178E+00,
                    -5.9086933E-01,
                    -1.7256713E-01,
                    -2.8131513E-02,
                    -2.3963370E-03,
                    -8.3823321E-05,
                ];
                var tab2 = [
                    0.000000E+00,
                    1.978425E+01,
                    -2.001204E-01,
                    1.036969E-02,
                    -2.549687E-04,
                    3.585153E-06,
                    -5.344285E-08,
                    5.099890E-10,
                    0.000000E+00,
                ];
                var tab3 = [
                    -3.11358187E+03,
                    3.00543684E+02,
                    -9.94773230E+00,
                    1.70276630E-01,
                    -1.43033468E-03,
                    4.73886084E-06,
                    0.00000000E+00,
                    0.00000000E+00,
                    0.00000000E+00,
                ];

                if (mv >= -8.095 && mv <= 0.0) {
                    c = tab1;
                } else if (mv > 0.0 && mv <= 42.914) {
                    c = tab2;
                } else if (mv > 42.914 && mv <= 69.553) {
                    c = tab3;
                } else {
                    throw { name: "OutOfRange", message: "Voltage specified is out of range for Type J thermocouple" };
                }
                var t = 0.0;
                for (var p = 0; p < c.length; p++) {
                    t += c[p] * Math.pow(mv, p);
                }

                return t;
            },

            // degrees C to type K millivolts
            to_type_k: function (degc) {
                var c;
                var tab1 = [
                    0.000000000000E+00,
                    0.394501280250E-01,
                    0.236223735980E-04,
                    -0.328589067840E-06,
                    -0.499048287770E-08,
                    -0.675090591730E-10,
                    -0.574103274280E-12,
                    -0.310888728940E-14,
                    -0.104516093650E-16,
                    -0.198892668780E-19,
                    -0.163226974860E-22,
                ];

                var tab2 = [
                    -0.176004136860E-01,
                    0.389212049750E-01,
                    0.185587700320E-04,
                    -0.994575928740E-07,
                    0.318409457190E-09,
                    -0.560728448890E-12,
                    0.560750590590E-15,
                    -0.320207200030E-18,
                    0.971511471520E-22,
                    -0.121047212750E-25,
                ];

                var a0 = 0.118597600000E+00;
                var a1 = -0.118343200000E-03;
                var a2 = 0.126968600000E+03;

                if (degc >= -270 && degc <= 0) {
                    c = tab1;
                } else if (degc > 0 && degc <= 1372) {
                    c = tab2;
                } else {
                    throw { name: "OutOfRange", message: "Temperature specified is out of range for Type K thermocouple" };
                }
                var e = 0;
                for (var p = 0; p < c.length; p++) {
                    e += c[p] * Math.pow(degc, p);
                }

                if (degc > 0) {
                    e += a0 * Math.exp(a1 * Math.pow(degc - a2, 2));
                }

                return e;
            },

            // type K millivolts to degrees C
            from_type_k: function (mv) {
                var c;
                var tab1 = [
                    0.0000000E+00,
                    2.5173462E+01,
                    -1.1662878E+00,
                    -1.0833638E+00,
                    -8.9773540E-01,
                    -3.7342377E-01,
                    -8.6632643E-02,
                    -1.0450598E-02,
                    -5.1920577E-04,
                    0.0000000E+00,
                ];

                var tab2 = [
                    0.000000E+00,
                    2.508355E+01,
                    7.860106E-02,
                    -2.503131E-01,
                    8.315270E-02,
                    -1.228034E-02,
                    9.804036E-04,
                    -4.413030E-05,
                    1.057734E-06,
                    -1.052755E-08,
                ];

                var tab3 = [
                    -1.318058E+02,
                    4.830222E+01,
                    -1.646031E+00,
                    5.464731E-02,
                    -9.650715E-04,
                    8.802193E-06,
                    -3.110810E-08,
                    0.000000E+00,
                    0.000000E+00,
                    0.000000E+00,
                ];

                if (mv >= -5.891 && mv <= 0.0) {
                    c = tab1;
                } else if (mv > 0.0 && mv <= 20.644) {
                    c = tab2;
                } else if (mv > 20.644 && mv <= 54.886) {
                    c = tab3;
                } else {
                    throw { name: "OutOfRange", message: "Voltage specified is out of range for Type K thermocouple" };
                }
                var t = 0.0;
                for (var p = 0; p < c.length; p++) {
                    t += c[p] * Math.pow(mv, p);
                }

                return t;
            },


            // degrees C to type N millivolts
            to_type_n: function (degc) {
                var c;
                var tab1 = [
                    0.000000000000E+00,
                    0.261591059620E-01,
                    0.109574842280E-04,
                    -0.938411115540E-07,
                    -0.464120397590E-10,
                    -0.263033577160E-11,
                    -0.226534380030E-13,
                    -0.760893007910E-16,
                    -0.934196678350E-19,
                ];
                var tab2 = [
                    0.000000000000E+00,
                    0.259293946010E-01,
                    0.157101418800E-04,
                    0.438256272370E-07,
                    -0.252611697940E-09,
                    0.643118193390E-12,
                    -0.100634715190E-14,
                    0.997453389920E-18,
                    -0.608632456070E-21,
                    0.208492293390E-24,
                    -0.306821961510E-28,
                ];

                if (degc >= -270 && degc <= 0) {
                    c = tab1;
                } else if (degc > 0 && degc <= 1300) {
                    c = tab2;
                } else {
                    throw { name: "OutOfRange", message: "Temperature specified is out of range for Type N thermocouple" };
                }
                var e = 0;
                for (var p = 0; p < c.length; p++) {
                    e += c[p] * Math.pow(degc, p);
                }

                return e;
            },

            // type N millivolts to degrees C
            from_type_n: function (mv) {
                var c;
                var tab1 = [
                    0.0000000E+00,
                    3.8436847E+01,
                    1.1010485E+00,
                    5.2229312E+00,
                    7.2060525E+00,
                    5.8488586E+00,
                    2.7754916E+00,
                    7.7075166E-01,
                    1.1582665E-01,
                    7.3138868E-03,
                ];
                var tab2 = [
                    0.00000E+00,
                    3.86896E+01,
                    -1.08267E+00,
                    4.70205E-02,
                    -2.12169E-06,
                    -1.17272E-04,
                    5.39280E-06,
                    -7.98156E-08,
                    0.00000E+00,
                    0.00000E+00,
                ];
                var tab3 = [
                    1.972485E+01,
                    3.300943E+01,
                    -3.915159E-01,
                    9.855391E-03,
                    -1.274371E-04,
                    7.767022E-07,
                    0.000000E+00,
                    0.000000E+00,
                    0.000000E+00,
                    0.000000E+00,
                ];

                if (mv >= -3.99 && mv <= 0.0) {
                    c = tab1;
                } else if (mv > 0.0 && mv <= 20.613) {
                    c = tab2;
                } else if (mv > 20.613 && mv <= 47.513) {
                    c = tab3;
                } else {
                    throw { name: "OutOfRange", message: "Voltage specified is out of range for Type N thermocouple" };
                }
                var t = 0.0;
                for (var p = 0; p < c.length; p++) {
                    t += c[p] * Math.pow(mv, p);
                }

                return t;
            },

            // degrees C to type R millivolts
            to_type_r: function (degc) {
                var c;
                var tab1 = [
                    0.000000000000E+00,
                    0.528961729765E-02,
                    0.139166589782E-04,
                    -0.238855693017E-07,
                    0.356916001063E-10,
                    -0.462347666298E-13,
                    0.500777441034E-16,
                    -0.373105886191E-19,
                    0.157716482367E-22,
                    -0.281038625251E-26,
                ];
                var tab2 = [
                    0.295157925316E+01,
                    -0.252061251332E-02,
                    0.159564501865E-04,
                    -0.764085947576E-08,
                    0.205305291024E-11,
                    -0.293359668173E-15,
                ];
                var tab3 = [
                    0.152232118209E+03,
                    -0.268819888545E+00,
                    0.171280280471E-03,
                    -0.345895706453E-07,
                    -0.934633971046E-14,
                ];
                if (degc >= -50 && degc <= 1064.18) {
                    c = tab1;
                } else if (degc > 1064.18 && degc <= 1664.5) {
                    c = tab2;
                } else if (degc > 1664.5 && degc <= 1768.1) {
                    c = tab3;
                } else {
                    throw { name: "OutOfRange", message: "Temperature specified is out of range for Type R thermocouple" };
                }
                var e = 0;
                for (var p = 0; p < c.length; p++) {
                    e += c[p] * Math.pow(degc, p);
                }

                return e;
            },

            // type R millivolts to degrees C
            from_type_r: function (mv) {
                var c;
                var tab1 = [
                    0.0000000E+00,
                    1.8891380E+02,
                    -9.3835290E+01,
                    1.3068619E+02,
                    -2.2703580E+02,
                    3.5145659E+02,
                    -3.8953900E+02,
                    2.8239471E+02,
                    -1.2607281E+02,
                    3.1353611E+01,
                    -3.3187769E+00,
                ];
                var tab2 = [
                    1.334584505E+01,
                    1.472644573E+02,
                    -1.844024844E+01,
                    4.031129726E+00,
                    -6.249428360E-01,
                    6.468412046E-02,
                    -4.458750426E-03,
                    1.994710149E-04,
                    -5.313401790E-06,
                    6.481976217E-08,
                    0.000000000E+00,
                ];
                var tab3 = [
                    -8.199599416E+01,
                    1.553962042E+02,
                    -8.342197663E+00,
                    4.279433549E-01,
                    -1.191577910E-02,
                    1.492290091E-04,
                    0.000000000E+00,
                    0.000000000E+00,
                    0.000000000E+00,
                    0.000000000E+00,
                    0.000000000E+00,
                ];
                var tab4 = [
                    3.406177836E+04,
                    -7.023729171E+03,
                    5.582903813E+02,
                    -1.952394635E+01,
                    2.560740231E-01,
                    0.000000000E+00,
                    0.000000000E+00,
                    0.000000000E+00,
                    0.000000000E+00,
                    0.000000000E+00,
                    0.000000000E+00,
                ];

                if (mv >= -0.226 && mv <= 1.923) {
                    c = tab1;
                } else if (mv > 1.923 && mv <= 11.361) {
                    c = tab2;
                } else if (mv > 11.361 && mv <= 19.739) {
                    c = tab3;
                } else if (mv > 19.739 && mv <= 21.103) {
                    c = tab4;
                } else {
                    throw { name: "OutOfRange", message: "Voltage specified is out of range for Type R thermocouple" };
                }
                var t = 0.0;
                for (var p = 0; p < c.length; p++) {
                    t += c[p] * Math.pow(mv, p);
                }

                return t;
            },

            // degrees C to type S millivolts
            to_type_s: function (degc) {
                var c;
                var tab1 = [
                    0.000000000000E+00,
                    0.540313308631E-02,
                    0.125934289740E-04,
                    -0.232477968689E-07,
                    0.322028823036E-10,
                    -0.331465196389E-13,
                    0.255744251786E-16,
                    -0.125068871393E-19,
                    0.271443176145E-23,
                ];
                var tab2 = [
                    0.132900444085E+01,
                    0.334509311344E-02,
                    0.654805192818E-05,
                    -0.164856259209E-08,
                    0.129989605174E-13,
                ];
                var tab3 = [
                    0.146628232636E+03,
                    -0.258430516752E+00,
                    0.163693574641E-03,
                    -0.330439046987E-07,
                    -0.943223690612E-14,
                ];

                if (degc >= -50 && degc <= 1064.18) {
                    c = tab1;
                } else if (degc > 1064.18 && degc <= 1664.5) {
                    c = tab2;
                } else if (degc > 1664.5 && degc <= 1768.1) {
                    c = tab3;
                } else {
                    throw { name: "OutOfRange", message: "Temperature specified is out of range for Type S thermocouple" };
                }
                var e = 0;
                for (var p = 0; p < c.length; p++) {
                    e += c[p] * Math.pow(degc, p);
                }

                return e;
            },

            // type S millivolts to degrees C
            from_type_s: function (mv) {
                var c;
                var tab1 = [
                    0.00000000E+00,
                    1.84949460E+02,
                    -8.00504062E+01,
                    1.02237430E+02,
                    -1.52248592E+02,
                    1.88821343E+02,
                    -1.59085941E+02,
                    8.23027880E+01,
                    -2.34181944E+01,
                    2.79786260E+00,
                ];
                var tab2 = [
                    1.291507177E+01,
                    1.466298863E+02,
                    -1.534713402E+01,
                    3.145945973E+00,
                    -4.163257839E-01,
                    3.187963771E-02,
                    -1.291637500E-03,
                    2.183475087E-05,
                    -1.447379511E-07,
                    8.211272125E-09,
                ];
                var tab3 = [
                    -8.087801117E+01,
                    1.621573104E+02,
                    -8.536869453E+00,
                    4.719686976E-01,
                    -1.441693666E-02,
                    2.081618890E-04,
                    0.000000000E+00,
                    0.000000000E+00,
                    0.000000000E+00,
                    0.000000000E+00,
                ];
                var tab4 = [
                    5.333875126E+04,
                    -1.235892298E+04,
                    1.092657613E+03,
                    -4.265693686E+01,
                    6.247205420E-01,
                    0.000000000E+00,
                    0.000000000E+00,
                    0.000000000E+00,
                    0.000000000E+00,
                    0.000000000E+00,
                ];

                if (mv >= -0.235 && mv <= 1.874) {
                    c = tab1;
                } else if (mv > 1.874 && mv <= 10.332) {
                    c = tab2;
                } else if (mv > 10.332 && mv <= 17.536) {
                    c = tab3;
                } else if (mv > 17.536 && mv <= 18.693) {
                    c = tab4;
                } else {
                    throw { name: "OutOfRange", message: "Voltage specified is out of range for Type S thermocouple" };
                }
                var t = 0.0;
                for (var p = 0; p < c.length; p++) {
                    t += c[p] * Math.pow(mv, p);
                }

                return t;
            },

            // degrees C to type T millivolts
            to_type_t: function (degc) {
                var c;
                var tab1 = [
                    0.000000000000E+00,
                    0.387481063640E-01,
                    0.441944343470E-04,
                    0.118443231050E-06,
                    0.200329735540E-07,
                    0.901380195590E-09,
                    0.226511565930E-10,
                    0.360711542050E-12,
                    0.384939398830E-14,
                    0.282135219250E-16,
                    0.142515947790E-18,
                    0.487686622860E-21,
                    0.107955392700E-23,
                    0.139450270620E-26,
                    0.797951539270E-30,
                ];
                var tab2 = [
                    0.000000000000E+00,
                    0.387481063640E-01,
                    0.332922278800E-04,
                    0.206182434040E-06,
                    -0.218822568460E-08,
                    0.109968809280E-10,
                    -0.308157587720E-13,
                    0.454791352900E-16,
                    -0.275129016730E-19,
                ];

                if (degc >= -270 && degc <= 0) {
                    c = tab1;
                } else if (degc > 0 && degc <= 400) {
                    c = tab2;
                } else {
                    throw { name: "OutOfRange", message: "Temperature specified is out of range for Type T thermocouple" };
                }
                var e = 0;
                for (var p = 0; p < c.length; p++) {
                    e += c[p] * Math.pow(degc, p);
                }

                return e;
            },

            // type T millivolts to degrees C
            from_type_t: function (mv) {
                var c;
                var tab1 = [
                    0.0000000E+00,
                    2.5949192E+01,
                    -2.1316967E-01,
                    7.9018692E-01,
                    4.2527777E-01,
                    1.3304473E-01,
                    2.0241446E-02,
                    1.2668171E-03,
                ];
                var tab2 = [
                    0.000000E+00,
                    2.592800E+01,
                    -7.602961E-01,
                    4.637791E-02,
                    -2.165394E-03,
                    6.048144E-05,
                    -7.293422E-07,
                    0.000000E+00,
                ];

                if (mv >= -5.603 && mv <= 0) {
                    c = tab1;
                } else if (mv > 0 && mv <= 20.872) {
                    c = tab2;
                } else {
                    throw { name: "OutOfRange", message: "Voltage specified is out of range for Type T thermocouple" };
                }
                var t = 0.0;
                for (var p = 0; p < c.length; p++) {
                    t += c[p] * Math.pow(mv, p);
                }

                return t;
            },

        },

        convert: function (input, opts) {
            input = parseFloat(input);

            if (isNaN(input)) {
                throw { name: "InvalidInput", message: "Invalid input" };
                //throw new Error("Invalid input");
            }

            // default options, default is type k millivolts input to deg C
            var options = extend({
                type: 'k',
                input: 'mv'
            }, opts);

            // check thermocouple type is valid and supported
            if (!this.supported_types.includes(options.type)) {
                throw { name: "InvalidInput", message: "Invalid thermocouple type" };
            }

            // select converter function
            var converter;
            if (options.input == "mv") {
                converter = "from_type_" + options.type;
            } else if (options.input == "degc") {
                converter = "to_type_" + options.type;
            } else {
                throw { name: "InvalidInput", message: "Only 'mv' or 'degc' is permitted as property 'input'" };
            }

            return this.converter[converter](input);

            // equivalent to jQuery.extend()
            function extend (out) {
                out = out || {};

                for (var i = 1; i < arguments.length; i++) {
                    if (!arguments[i])
                        continue;

                    for (var key in arguments[i]) {
                        if (arguments[i].hasOwnProperty(key))
                            out[key] = arguments[i][key];
                    }
                }

                return out;
            }
        }

    } // return
})();

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Thermocouple;
else
    window.Thermocouple = Thermocouple;

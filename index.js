
var request = require("request");

var cheerio = require('cheerio');

var fs = require("fs");

// exports.parse = function () {

var color_red = "\x1b[31m";
var color_green = "\x1b[32m";

var parsedData = {};

//Parseamos la ISO 3166-1
request({
    url: "https://en.wikipedia.org/wiki/ISO_3166-1",
    json: true
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {
        var $ = cheerio.load(body);
        //Segunda tabla
        $('.wikitable').eq(1).find('tbody tr').each(function (obj, index) {
            // Para cada fila
            var $td = $(this).find('td');
            var english_short_name = $td.eq(0).find('a').first().text();
            var alpha_2_code = $td.eq(1).text();
            var alpha_3_code = $td.eq(2).text();
            var numeric_3_code = $td.eq(3).text();
            var link = $td.eq(4).find('a').first().attr('href');
            var isIndependent = $td.eq(5).text();
            //Insertamos ISO 3166-1
            if (english_short_name && english_short_name != "" &&
                alpha_2_code && alpha_2_code != "" &&
                alpha_3_code && alpha_3_code != "" &&
                numeric_3_code && numeric_3_code != "") {
                parsedData[alpha_2_code] = {
                    english_short_name: english_short_name,
                    alpha_2_code: alpha_2_code,
                    alpha_3_code: alpha_3_code,
                    numeric_3_code: numeric_3_code,
                    subdivisions: {}
                };
                // console.log(".........", english_short_name, alpha_2_code, alpha_3_code, numeric_3_code)
            }
            //Si isIndependent tenemos que parsear la ISO 3166-2
            if ("Yes" == isIndependent) {
                //Parseamos la ISO 3166-2
                request({
                    url: "https://en.wikipedia.org" + link,
                    json: true
                }, function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        var $ = cheerio.load(body);
                        // Parseamos todas las tablas que están antes de la seccion current codes
                        var num_tables = $("table.wikitable.sortable").length;
                        console.info(color_green, "https://en.wikipedia.org" + link + " - Tables: " + num_tables);
                        for (i = 0; i < num_tables; i++) {
                            // Tabla i
                            $("table.wikitable.sortable").eq(i).find('tbody tr').each(function () {
                                // Para cada fila
                                var $td = $(this).find('td');
                                var code = $td.eq(0).find('span').first().text();
                                var subdivision_name = $td.eq(1).find('a').first().text();
                                //Añadimos la ISO 3166-2 a las subdivisions de la ISO 3166-1
                                if (subdivision_name && subdivision_name != "" &&
                                    code && code != "") {
                                    parsedData[alpha_2_code].subdivisions[code] = {
                                        english_short_name: subdivision_name,
                                        alpha_2_code: null,
                                        alpha_3_code: null,
                                        numeric_3_code: code,
                                    }
                                    // console.log("-.-.-.", subdivision_name, code);
                                }
                                fs.writeFileSync("data.json", JSON.stringify(parsedData, null, 2));
                            })
                        }
                    } else {
                        console.error(color_red, "Error: ", response.statusCode);
                    }
                });
            }
        })
    } else {
        console.error(color_red, "Error: ", response.statusCode);
    }
})

// }
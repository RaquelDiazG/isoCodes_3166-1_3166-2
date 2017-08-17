
var lodash = require('lodash');

var request = require("request");

var cheerio = require('cheerio');


// exports.parse = function () {


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
                console.log(".........", english_short_name, alpha_2_code, alpha_3_code, numeric_3_code)
            }
            
        })
    } else {

    }
})

// }
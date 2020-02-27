//convertit en fahrenheit la valeure récupérée sur l'api météo
module.exports = {
    kelvinToFahrenheit: function(kelvinTemp) {
    return (((kelvinTemp - 273.15) * 9/5 + 32)).toFixed(2).toString();
 }
};

fs = require('fs');
path = require('path');

fs.watch(path.join('c:', 'it'), { persistent: true }, function (event, fileName) {
    console.log("Event: " + event);
    console.log(fileName + "\n");
}

);

    /*
//path.win32.basename('C:\\temp\\myfile.html');
var path = require('path');
//onsole.log(path.win32.basename('C:\\temp\\myfile.html'));


var d = new Date();
var year =d.getFullYear();
var month = d.getMonth();
var day = d.getDate();

if (month + 1 < 10){
    month = "0" + (month + 1);
}


var inputFile = year + "-" + month + "-" + day + ".csv";


var inputFullPath = "C:\\IT\\" + path.basename(inputFile);

console.log(inputFullPath);
*/

//console.log(pathName);



//var inputFile = "file:///C:/Eric Share/Coding/Node/csv/WeatherStation/" + year + "-" + month + "-" + day+ ".csv";
//console.log(inputFile);
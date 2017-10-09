var csv = require('csv');      
var ejs = require('ejs');
var fs = require('fs');
var assert = require('assert');
var path = require('path');

ejs.open ='{{';     //ejs will be using {{ and }} for escapements
ejs.close ='}}';

//figure out how to get it to update date

var d = new Date();
    
var year = d.getFullYear();
var month = d.getMonth();
var day = d.getDate();
    
if (month + 1 < 10){
    month = "0" + (month + 1);
}
else month = (month + 1);
   
var inputFileGenerator = year + "-" + month + "-" + day + ".csv";
//console.log(inputFileGenerator);
var inputFile = path.join('c:', 'IT', inputFileGenerator);
//var inputFile = inputFileGenerator;
//var inputFile = "input.csv";
//var inputFile = 'test.csv';
//('c:\\it\\' + inputFileGenerator);
//console.log(process.cwd())
console.log(inputFile);
console.log(process.cwd())
//var inputFile = "input5.csv";       //change to read from file for variables?
    
var templateFile = "template2.ejs";
var outputFile = "output.html";
    
    
    
assert.ok(inputFile.lastIndexOf('csv') == (inputFile.length - 'csv'.length), "input file should be .csv");
assert.ok(templateFile.lastIndexOf('ejs') == (templateFile.length -'ejs'.length), "template should be .ejs file");


//assert.ok(outputFile.lastIndexOf('htm') == (inputFile.length - 'htm'.length), "output file should be .htm")

//console.log(`Platform is ${process.platform}`);

var template = ejs.compile(fs.readFileSync(templateFile, 'utf8'));

var outLines=[];

fs.watch(inputFile, {encoding: 'buffer' }, (eventType, filename) => {
    if (filename) {
        console.log('filechanged', filename, inputFile);
        console.log("Event: " + event);

        var template = ejs.compile(fs.readFileSync(templateFile, 'utf8'));
        csv()
        .fromPath(inputFile, {columns: ['DT','ABP','Temp','Hum','AA','AH','GR','VP','DP','ADR','AA','PA','WD','WS','WG','AL']})

        .on('data',function(data,index){
            try{
                outLines.push(template(data));
            } catch (e){
                console.error(e.stack)
            }
        })
        .on('end',function(count){
            fs.writeFileSync(outputFile, outLines[1], 'utf8')
            console.log("done!");
        })
        .on('error',function(error){
            console.log(error.message);
        });

    }
});
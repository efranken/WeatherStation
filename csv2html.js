// first of all make sure we have enough arguments (exit if not)
/*
if (process.argv.length <= 5)
{
    console.error("Usage: node csv2html.js input.csv template.ejs output.html")
    console.error();
    console.error("Outputs the given template for each row in the given input.")
    console.error("Uses the first row of the CSV as column names in the template.")
    process.exit(1);
}
*/
// now load the modules we need
var csv = require('csv'),       // library for processing CSV spreadsheet files
    ejs = require('ejs'),       // library for turning .ejs templates into .html files
    fs = require('fs'),         // node.js library for reading and writing files
    assert = require('assert'); // node.js library for testing for error conditions

// make sure EJS is configured to use curly braces for templates
ejs.open = '{{';
ejs.close = '}}';

// grab the file names from the command arguments array
// and give them more convenient names
var inputFile = "input5.csv"; 
var templateFile = "template2.ejs";
var outputFile = "output.html";
//var processedCSV;

// make sure each file is the right type (exit if not)
assert.ok(inputFile.lastIndexOf('csv') == (inputFile.length - 'csv'.length), "input file should be a .csv file");
assert.ok(templateFile.lastIndexOf('ejs') == (templateFile.length - 'ejs'.length), "template file should be an .ejs file");
//assert.ok(outputFile.lastIndexOf('html') == (outputFile.lengthW - 'html'.length), "output file should be an .html file");

// make sure we use the correct line-endings on Windows
var EOL = (process.platform === 'win32' ? '\r\n' : '\n')

// build the template
var template = ejs.compile(fs.readFileSync(templateFile, 'utf8'))

// copy file from location 
/*
function copy()
{
  var myObject;
  myObject = new ActiveXObject("Scripting.FileSystemObject");
  processedCSV = myObject.file.copy("c:\\test.txt", "c:\\mytest.txt");
}
*/

// make an array to store our output
var outLines = [];
var time = 10;
while(time<100)
    {
    csv()
    .fromPath(__dirname+'/'+inputFile, {columns: ['DT','ABP','Temp','Hum','AA','AH','GR','VP','DP','ADR','AA','PA','WD','WS','WG','AL'] }) //change name of columns to get rid of / issue
    //columns: true specifies that the each item in the first line 

    //.to(function(data){ })

    //.transform(function(data){
        // optional transform step, e.g.
        //data['Year'] = new Date(data['Date']).getUTCFullYear();
        //https://stackoverflow.com/questions/8493195/how-can-i-parse-a-csv-string-with-javascript-which-contains-comma-in-data
        
    // return data
    //})

    .on('data',function(data,index){
        //console.log('#'+index+' '+JSON.stringify(data));
        //console.log(data);
        //index = number of line of csv
        try {
            outLines.push(template(data));
            //push adds a new element to end of array, and returns the new length
            //try using find, "returns the value of the first element in an array that pass a test"
        } catch (e) {
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
   
    console.log(time);
    time++;
}


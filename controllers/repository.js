const fs = require('fs');
const path = require('path');

var tagTable = [];
var blRules = [];

var PREFIX_INFO = "INFO: ";
var PREFIX_ERROR = "ERROR: "


const dirPath = path.join(__dirname, '../populateServer/regleNotation.json');
/*
fs.readFile(dirPath , (err, data) => {
    if (err) throw err;
    let bl = JSON.parse(data);
    if ( bl && bl.tagTable ){
        tagTable = bl.tagTable;
    }
    if ( bl && bl.rules ){
        blRules = bl.rules;
    }
    console.log(PREFIX_INFO + "Bussiness rules files read. tagTable size:" + tagTable.length + " blRules size: " + blRules.length);

});
 */
exports.init = function ( cb ) {

    var data = fs.readFileSync(dirPath);
    var err = 0;
    if ( data ){
        let bl = JSON.parse(data);
        if ( bl && bl.tagTable ){
            tagTable = bl.tagTable;
        }
        if ( bl && bl.rules ){
            blRules = bl.rules;
        }
    }
    console.log(PREFIX_INFO + "Bussiness rules files read. tagTable size:" + tagTable.length + " blRules size: " + blRules.length);
    cb (tagTable, blRules );


}
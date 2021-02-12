var express = require('express');
var router = express.Router();

var cors = require ( 'cors' ) ;

var err1 = {"id":"err1","details":{"en":"invalid number of question"},"fr":"nombre de question invalide"}

const fs = require('fs');
const path = require('path');
const repository_backend = require('./repository');

var tagTable = [];
var blRules = [];

var PREFIX_INFO = "INFO: ";
var PREFIX_ERROR = "ERROR: "

/*
const dirPath = path.join(__dirname, '../populateServer/regleNotation.json');
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
exports.init = function (){

    console.log(PREFIX_INFO + "init repository")

    repository_backend.init( function ( itagTable, iblRules ){

        blRules = iblRules;
        tagTable = itagTable;

        console.log(PREFIX_INFO + "init repository done");
    })
}

this.init();

var getAbilities = function( abilities ){
    for ( var i= 0; i<abilities.length; i++ ){

        console.log(abilities[i].aid)

    }

}

var computeScore = function(qres){
    var score = 0;
    if ( qres.length !=  5 ){

        throw new Error(err1);
    }
    for (var i=0; i<qres.length; i++){
        score = score + qres[i].score;

    }
    return score/5;


}

translateTag = function( tagId ){
    var tagName = tagId;

    for ( var i=0; i<tagTable.length; i++ ){
        if ( tagTable && tagTable[i]["tagId"] && tagTable[i]["tagId"] == tagId ){
            tagName = tagTable[i]["label"];
            return tagName;
        }

    }



    return tagName;
}



var associateBlock = function( iquestionnaireId, iscore ){



    var tagStruct  = this.getTagIdFromScore ( iquestionnaireId, iscore );

    return tagStruct;




}




formatScoreOutput = function (abilities){

    var dataOutput = {};
    console.log(PREFIX_INFO, "questionnaire nbr:" + abilities.length )
    for ( var i= 0; i<abilities.length; i++ ){

        console.log(PREFIX_INFO, "questionnaire:" + abilities[i].id)
        var questions = abilities[i].questions;

        var score = computeScore (questions);
        var tagStruct = associateBlock(abilities[i].id,score);
        abilities[i].score = score;
        abilities[i].tags = [];

        abilities[i].tags.push( tagStruct[1] )

    }


}

getTagIdFromScore = function ( iqid, iscore ){
    var tagId = "";
    var tagName = "";
    var found = false;

    for ( var i=0; i<blRules.length; i++ ){

        if (blRules[i].questionnaireId === iqid ){

            var scores = blRules[i].scores;

            for ( var j=0; j<scores.length; j++ ){

                if (scores[j]["score"] === Math.trunc(iscore) ) {

                    //console.log("questionnaire: " + questionnaireId + " with score: " + score + " have this tagId: " + tagId );
                    found = true;
                    tagId = scores[j]["tagId"];
                }

            }







        }


    }


    if (found) {
        tagName = this.translateTag(tagId)
        console.log( PREFIX_INFO + "questionnaire: " + iqid + " with score: " + iscore + " have this tagId: " + tagId + " tag Name:" + tagName );

    }else {
        console.log( PREFIX_ERROR + "questionnaire: " + iqid + " with score: " + iscore + " have no tagId: " );

    }
    return [tagId,tagName];


}


exports.execute = function(req, res) {


    try {
        if (req && req.body) {
            var data = req.body;
            console.log(PREFIX_INFO + "Request received" + data)
            var abilities = data.abilities;
            //getAbilities(abilities)

            formatScoreOutput(abilities);

            console.log(PREFIX_INFO + "Request finished" +  data)


            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(data));

            //console.log(id)
            //res.end()
        } else {
            res.send('add question');
        }
    }catch (e) {
        console(e.message)
        console(e.stack)
        res.status(500).send(e);
    }
};





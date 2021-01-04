var express = require('express');
var router = express.Router();

var cors = require ( 'cors' ) ;

var err1 = {"id":"err1","details":{"en":"invalid number of question"},"fr":"nombre de question invalide"}



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

formatScoreOutput = function (abilities){

  var dataOutput = {};

  for ( var i= 0; i<abilities.length; i++ ){

    console.log(abilities[i].id)
    var questions = abilities[i].questions;

    var score = computeScore (questions);
    abilities[i].score = score;


  }


}

/* GET users listing. */
router.options('/add', cors() );
router.post('/add', cors(),function(req, res, next) {

   try {
       if (req && req.body) {
           var data = req.body;
           console.log("==>", data)
           var abilities = data.abilities;
           //getAbilities(abilities)

           formatScoreOutput(abilities);

           console.log("++>", data)


           res.setHeader('Content-Type', 'application/json');
           res.send(JSON.stringify(data));

           //console.log(id)
           //res.end()
       } else {
           res.send('add question');
       }
   }catch (e) {
       console(e.message)

       res.status(500).send(e);
   }
});

module.exports = router;


/**
 {
   "abilities":[

    { "aid":"c1",
          "questions":[

                      { "qid" :"q1", "score" : 1},
                      { "qid" :"q2", "score" : 1},
                      { "qid" :"q3", "score" : 1},
                      { "qid" :"q4", "score" : 1},
                      { "qid" :"q5", "score" : 1}



          ]
    }




   ]
 }
 */
//https://www.theodinproject.com/courses/nodejs/lessons/testing-routes-and-controllers

var fs = require("fs");
const questionRouter = require("../routes/question");
var test = require("tape");
const request = require("supertest");
const express = require("express");
var _ = require('lodash');
//const app = express();
var app = require('../app');
import IRepository from "../repository/IRepository";


//app.use(express.urlencoded({ extended: false }));

//app.use('/service/backend/question', questionRouter);


var dataAddRequest = fs.readFileSync(`${__dirname}/data/questionnaireInput1.json`, {encoding: 'utf8'});



test('Analyse questionnaire', function (t) {

            request(app)
                .post("/service/backend/question/add")
                .send(JSON.parse(dataAddRequest))
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(err)
                    var data = JSON.parse(res.text)
                    console.log(data);
                    t.same(data.abilities[0].tags[0], "faible", 'tag as expected for ' + data.abilities[0].id);
                    t.same(data.abilities["0"].score, 2.2, 'score as expected for ' + data.abilities[0].id )

                    t.same(data.abilities[1].tags[0], "fort", 'tag as expected for ' + data.abilities[1].id);
                    t.same(data.abilities[1].score, 8, 'score as expected for ' + data.abilities[1].id );

                    t.same(data.abilities[2].tags[0], "fort", 'tag as expected for ' + data.abilities[2].id);
                    t.same(data.abilities[2].score, 10, 'score as expected for ' + data.abilities[2].id )




                    t.end();
                });

});


var dataTagsReferenceToSave = fs.readFileSync(`${__dirname}/data/dataTagsReferenceToSave.json`, {encoding: 'utf8'});

test('publish tags reference', function (t) {
    var body = {"type":"tags"};
    body.data = JSON.parse(dataTagsReferenceToSave);
    request(app)
        .post("/service/backend/admin/publish")
        .send(body)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            console.log(err);
            t.is(err, null);
            t.end();
        });
});

test('refresh tags reference', function (t) {
    var arg = {"type":"tags"}
    request(app)
        .post("/service/backend/admin/refresh")
        .send(arg)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            console.log("err:" + err);

            console.log("redis: " + res.text);
            //console.log("file: " + dataTagsReferenceToSave);
            var file1 = JSON.stringify(JSON.parse(dataTagsReferenceToSave));
            console.log("file: " + file1);

            var res = _.isEqual(res.text, file1);
            console.log(res);
            t.is(res, true);
            t.end();
        });

});

var dataPartTypesReference = fs.readFileSync(`${__dirname}/data/dataPartTypesReference.json`, {encoding: 'utf8'});

test('publish part type  reference', function (t) {
    var body = {"type":"parttypes"};
    body.data = JSON.parse(dataPartTypesReference);
    request(app)
        .post("/service/backend/admin/publish")
        .send(body)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            console.log(err);
            t.is(err, null);
            t.end();
        });
});

test('refresh part type  reference', function (t) {
    var arg = {"type":"parttypes"}
    request(app)
        .post("/service/backend/admin/refresh")
        .send(arg)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            console.log("err:" + err);

            console.log("redis: " + res.text);

            var file1 = JSON.stringify(JSON.parse(dataPartTypesReference));
            console.log("file: " + file1);

            var res = _.isEqual(res.text, file1);
            console.log(res);
            t.is(res, true);
            t.end();
        });

});

var dataCategoriesReferenceToSave = fs.readFileSync(`${__dirname}/data/dataCategoriesReferenceToSave.json`, {encoding: 'utf8'});

test('publish categories reference', function (t) {
    var body = {"type":"categories"};
    body.data = JSON.parse(dataCategoriesReferenceToSave);
    request(app)
        .post("/service/backend/admin/publish")
        .send(body)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            console.log(err);
            t.is(err, null);
            t.end();
        });
});

test('refresh categories reference', function (t) {
    var arg = {"type":"categories"}
    request(app)
        .post("/service/backend/admin/refresh")
        .send(arg)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            console.log("err:" + err);

            console.log("redis: " + res.text);
            //console.log("file: " + dataTagsReferenceToSave);
            var file1 = JSON.stringify(JSON.parse(dataCategoriesReferenceToSave));
            console.log("file: " + file1);

            var res = _.isEqual(res.text, file1);
            console.log(res);
            t.is(res, true);
            t.end();
        });

});

var dataSample1ToSave = fs.readFileSync(`${__dirname}/data/dataSample1.json`, {encoding: 'utf8'});
test('publish data', function (t) {
    var body = {"type":"datas"};
    body.data = JSON.parse(dataSample1ToSave);
    request(app)
        .post("/service/backend/admin/publish")
        .send(body)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            console.log(err);
            t.is(err, null);
            t.end();
        });
});
test('refresh data', function (t) {
    var body = {"type":"datas"}
    request(app)
        .post("/service/backend/admin/refresh")
        .send(body)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            console.log("err:" + err);

            console.log("redis: " + res.text);
            //console.log("file: " + dataTagsReferenceToSave);
            var file1 = JSON.stringify(JSON.parse(dataSample1ToSave));
            console.log("file: " + file1);

            var res = _.isEqual(res.text, file1);
            console.log(res);
            t.is(res, true);
            t.end();
        });

});

function getConcatenateData(){

    var body = [];
    var dataType = IRepository.getDataType();
    for ( let i=0; i<dataType.length; i++ ){
        let obj = {};
        obj.type =  dataType[i];
        if (  dataType[i] === "datas" ){
            obj.data = JSON.parse(dataSample1ToSave);
        }else if (  dataType[i] === "tags" ){
            obj.data = JSON.parse(dataTagsReferenceToSave);
        }else if (  dataType[i] === "categories" ){
            obj.data = JSON.parse(dataCategoriesReferenceToSave);
        }else if (  dataType[i] === "parttypes" ){
            obj.data = JSON.parse(dataPartTypesReference);
        }else{
            continue;
        }
        body.push(obj);


    }
    return body;
}

test('publish datas categories tags', function (t) {


    var body = getConcatenateData();
    console.log("body: " + JSON.stringify(JSON.parse(JSON.stringify(body))));

    request(app)
        .post("/service/backend/admin/publish")
        .send(body)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            console.log(err);
            t.is(err, null);
            t.end();
        });
});


test('refresh all datas: datas categories tags', function (t) {
    let body = null;
    request(app)
        .post("/service/backend/admin/refresh")
        .send(body)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            console.log("err:" + err);

            console.log("redis: " + res.text);
            //console.log("file: " + dataTagsReferenceToSave);

            var file = getConcatenateData();
            var file1 = JSON.stringify(JSON.parse(JSON.stringify(file)));
            console.log("file: " + file1);

            var res = _.isEqual(res.text, file1);
            console.log(res);
            t.is(res, true);
            t.end();
        });

});
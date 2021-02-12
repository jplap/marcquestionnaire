import IRepository from "../repository/IRepository";

var express = require('express');
var router = express.Router();

var cors = require('cors');

var err1 = {"id": "err1", "details": {"en": "invalid number of question"}, "fr": "nombre de question invalide"}

const fs = require('fs');
const path = require('path');
var repositoryFactoryWrapper = require("../repository/repositoryFactory.js");

var tagTable = [];
var blRules = [];

var PREFIX_INFO = "INFO: ";
var PREFIX_ERROR = "ERROR: "

const PREFIX_PROTO = "FOCUS"

var inst = null;

exports.init = function () {

    console.log(PREFIX_INFO + "init repository");
    var repoFactoryInstance = new repositoryFactoryWrapper.repositoryFactory();
    inst = repositoryFactoryWrapper.repositoryFactory.create({"name": "redis"})

    console.log(PREFIX_INFO + "init");

}

this.init();

exports.publish = function (req, res) {
    console.log(PREFIX_INFO + "publish");
        if (req.body instanceof Array) {
                var data = req.body;
                __publishAll(data).then((valeur) => {
                    // Promesse tenue
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).send({});

                }, (raison) => {
                    // Rejet de la promesse
                    res.status(500).send(raison.msg);
                });
        } else {
            var data = req.body;
            __publishAType(data).then((valeur) => {
                // Promesse tenue
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send();

            }, (raison) => {
                // Rejet de la promesse
                res.status(500).send(raison.msg);
            });
        }
}
var __publishAll = function (data) {
    return new Promise((resolve, reject) => {
        var all_results = [];
        var all_errors = [];
        var promises = [];
        var dataType = IRepository.getDataType();
        for (var i = 0; i < data.length; i++) {
            var jsonData = data[i];
            promises.push(
                __publishAType(data[i])
            )
        }
        //await Promise.all(promises);
        Promise.all(promises)
            .then((res) => {
                // use results r1, r2, r3

                resolve();
            })
    })
}
var __publishAType = function ( data ){
    return new Promise((resolve, reject) => {
        var errResponse = {code: 0, msg: "successfull"};
        console.log(PREFIX_INFO + "publish type: " + data.type);
        if (data === null && data.type === null) {
            errResponse = {code: 1, msg: "type not set: "  };
            reject(errResponse);
        }
        var dataType = IRepository.getDataType();
        if (dataType.includes(data.type, 0) === false) {
            // unknown type
            errResponse = {code: 1, msg: "type unknown: " + data.type};
            reject(errResponse);

        }


        let key = PREFIX_PROTO + ":" + data.type;
        inst.publish(key,data).then((valeur) => {
            resolve(valeur);
        }, (raison) => {
            reject(raison);
        })

    })

}

var __refreshAll = function (data, cb) {
    return new Promise((resolve, reject) => {
        var all_results = [];
        var all_errors = [];
        var promises = [];
        var dataType = IRepository.getDataType();
        for (let i = 0; i < dataType.length; i++) {
            console.log("current type: " + dataType[i]);
            promises.push(
                __refreshAType({type: dataType[i]})
            )
        }
        //await Promise.all(promises);
        Promise.all(promises)
            .then((res) => {
                // use results r1, r2, r3
                let err = {};
                let datas = [];
                for (let i = 0; i < res.length; i++) {
                    datas.push({type: dataType[i], "data": res[i]});
                }
                var errResponse = {code: 0, msg: "successfull"};
                resolve(datas);
            })
    })


}
var __refreshAType = function ( data ) {
    return new Promise((resolve, reject) => {
        var errResponse = {code: 0, msg: "successfull"};
        console.log(PREFIX_INFO + "__refreshAType:"+ "refresh type: " + data.type);
        var dataType = IRepository.getDataType();
        if (dataType.includes(data.type, 0) === false) {
            // unknown type
            errResponse = {code: 1, msg: "type unknown: " + data.type};
            reject(errResponse);

        }

        let key = PREFIX_PROTO + ":" + data.type;

        inst.refresh(key).then((valeur) => {
            resolve(valeur);
        }, (raison) => {
            reject(raison);
        })



    });
}

exports.refresh = function (req, res) {
    console.log(PREFIX_INFO + "refresh");

    var data = req.body;
        var errResponse = {code:0, msg:"successfull"};
        console.log(PREFIX_INFO + "refresh:" + " type: " + data.type);
        if ( data === null ||  data.type === undefined || data.type === null || data.type === undefined){
            // return all types of data
            __refreshAll(data).then((valeur) => {
                // Promesse tenue
                res.setHeader('Content-Type', 'application/json');

                res.end(JSON.stringify(valeur))
            }, (raison) => {
                // Rejet de la promesse
                res.status(500).send(raison.msg);
            });
        }else {

            __refreshAType(data).then((valeur) => {
                // Promesse tenue
                res.setHeader('Content-Type', 'application/json');

                res.end(JSON.stringify(valeur))
            }, (raison) => {
                // Rejet de la promesse
                res.status(500).send(raison.msg);
            });
        }



}

//module.exports.__refreshAll = __refreshAll
//module.exports.__refreshAType = __refreshAType





import IRepository from "./IRepository";


const redis = require("redis");
var client = redis.createClient();
client.on('error', function (err) {
    console.error(err)
})

const PREFIX_INFO = "repositoryRedis:INFO:";
const PREFIX_ERROR = "repositoryRedis:ERROR:"
const PREFIX_PROTO = "FOCUS"


class repositoryRedis extends IRepository {

    constructor(opts) {
        console.log(PREFIX_INFO + "constructor");

        super(opts);
        this.dataBlocks = null;
    }


    init(opts) {
        console.log(PREFIX_INFO + "init");


        console.log(PREFIX_INFO + "init: data" + this.dataBlocks);
        return this;
    }

    publish(key, data) {

        return new Promise((resolve, reject) => {
            client.set(key, JSON.stringify(data.data), function (err, valueString) {
                if (err != null) {
                    console.log(PREFIX_ERROR + "publish set failed: " + err);
                    var errResponse = {code: 2, msg: "set failed: " + err.msg}
                    reject(errResponse);
                } else {
                    resolve();
                }

            });
        })

    }

    refresh(key) {
        return new Promise((resolve, reject) => {
            client.get(key, function (err, valueString) {
                if (err != null) {
                    console.log(PREFIX_ERROR + "refresh get failed: " + err);
                    var errResponse = {code: 2, msg: "get failed: " + err.msg}
                    reject(errResponse);
                } else {
                    resolve(JSON.parse(valueString));
                }

            });
        })


    }

}

export default repositoryRedis;

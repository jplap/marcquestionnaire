import IRepository from "./IRepository";



const PREFIX_INFO = "repositoryFactory:INFO:";
const PREFIX_ERROR = "repositoryFactory:ERROR:"

class repositoryFile extends IRepository {

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
    publish(){
        console.log(PREFIX_INFO + "publish");

    }





}

export default repositoryFile;




import repositoryFile from "./repositoryFile";
import repositoryRedis from "./repositoryRedis";



var PREFIX_INFO = "repositoryFactory:INFO: ";
var PREFIX_ERROR = "repositoryFactory:ERROR: "

class repositoryFactory  {


    static get(){
        if ( this.currentRepo ) {
            return this.currentRepo;
        }else{
            console.log (PREFIX_ERROR + 'get: Default implementation will be instanciate');
            return null;
            //return this.create({"name":"file"})
        }
    }
    static create(opts){
        if (opts && opts.name && opts.name === "file") {
            console.log(PREFIX_INFO + 'create:file implementation');
            this.currentRepo = new repositoryFile(opts); //fs.readFileSync(dirPath);
            this.currentRepo.init(opts);
            return this.currentRepo;
        }else if (opts && opts.name && opts.name === "redis"){
            console.log(PREFIX_INFO + 'create:redis implementation');
            this.currentRepo = new repositoryRedis(opts); //fs.readFileSync(dirPath);
            this.currentRepo.init(opts);
            return this.currentRepo;
        }else{
            console.log(PREFIX_ERROR + 'create:Unknown implementation required');
            return null;
        }


    }
}
export  { repositoryFactory };
//module.exports = repositoryFactory;
/*
function repositoryFactory (opts) {

    if (opts.name == "file"){
        this.currentRepo = new repositoryFile(opts); //fs.readFileSync(dirPath);
        this.currentRepo.init(opts);
        return this.currentRepo;
    }
    throw new Error(PREFIX_ERROR + 'create:Unknown implementation required');



}
repositoryFactory.prototype.get = function(){
    if ( this.currentRepo ) {
        return this.currentRepo;
    }else{
        throw new Error(PREFIX_ERROR + 'get: Default implementation will be instanciate');
        this.create("file")
    }


}


repositoryFactory.create = function(opts)
{

    return new repositoryFactory(opts);


}

module.exports = repositoryFactory;


 */
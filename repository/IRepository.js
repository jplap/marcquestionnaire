//import repositoryFile from "./repositoryFile";


/*
function dataType (){
    return ["datas", "categories","tags"];
}
*/

class IRepository {

    static getDataType() {
        return (["datas", "categories","tags","parttypes"])
    } ;


    constructor() {
        console.log();
        this._categoriesRefTypes = IRepository.getDataType();
    }
    publish(data){

    }
    refresh( type ){

    }

    init(opts) {


    }



    generateGuid() {
        var result, i, j;
        result = '';
        for(j=0; j<32; j++) {
            if( j === 8 || j === 12 || j === 16 || j === 20)
                result = result + '-';
            i = Math.floor(Math.random()*16).toString(16).toUpperCase();
            result = result + i;
        }
        return result;
    }

}

export default IRepository

//module.exports = IRepository;
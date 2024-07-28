const Response = require('../../responseData/responseData')
var mongoDbService= require('../../service/mongodb')
const { MongoClient,  ObjectId } = require("mongodb");

var winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'actionDataprocessor' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'success.log' }),
  ],
});

const error = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'error.log' }),
  ],
});

class actionDataprocessor{
    async insert(request){
        var responseData = new Response()
        try{
            var result=await mongoDbService.db.collection('myStore').insertOne(request)
            responseData.getSuccessResponseData(result)
            logger.info(`insert -  ${JSON.stringify(result)}`)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
            error.info(`insert -  ${JSON.stringify(e)}`)
        }
        return responseData
    }

    async getListAll(){
        var responseData = new Response()
        try{
            
            var result=await mongoDbService.db.collection('myStore').find({}).toArray()            
            responseData.getSuccessResponseData(result)
            logger.info(`getListAll -  ${JSON.stringify(result)}`)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
            error.info(`getListAll -  ${JSON.stringify(e)}`)
        }
        return responseData
    }

    async getDetail(id){
        var responseData = new Response()
        try{           
            var result=await mongoDbService.db.collection("myStore").findOne({"_id":new ObjectId(id)})
            responseData.getSuccessResponseData(result)
            logger.info(`getDetail -  ${JSON.stringify(result)}`)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
            error.info(`getDetail -  ${JSON.stringify(e)}`)
        }
        return responseData
    }

    async edit(id,request){
        var responseData = new Response()
        try{     
            var result=await mongoDbService.db.collection("myStore").updateOne(
                { "_id": new ObjectId(id)},
                {
                    $set: {
                        "name":request.name,
                        "description":request.description
                    }
                }
            );
            responseData.getSuccessResponseData(result)
            logger.info(`edit -  ${JSON.stringify(result)}`)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
            error.info(`edit -  ${JSON.stringify(e)}`)
        }
        return responseData
    }

    async deleteAction(id){
        var responseData = new Response()
        try{   
            var result=await mongoDbService.db.collection("myStore").deleteOne( { "_id": new ObjectId(id) } )
            
            var Total=await mongoDbService.db.collection("myStore").find({}).toArray()
            responseData.getSuccessResponseData(Total)
            logger.info(`deleteAction -  ${JSON.stringify(Total)}`)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
            error.info(`deleteAction -  ${JSON.stringify(e)}`)
        }
        return responseData
    }

}

module.exports=new actionDataprocessor()
var actionDataprocessor = require("./actionDataprocessor")
var User = require("../../models/User")
var ResponseData=require("../../responseData/responseData")

var winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'actionService' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'success.log' }),
  ],
});

const error = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'actionService' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'error.log' }),
  ],
});


class actionService{
    async insert(request){
        var responseData=new ResponseData()
        try{
            var userInfo=new User()
            userInfo.name=request.name
            userInfo.description=request.description
            userInfo.createdID=request.createdID
            var result=await actionDataprocessor.insert(userInfo)
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
        var responseData=new ResponseData()
        try{
            var result=await actionDataprocessor.getListAll()
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
        var responseData=new ResponseData()
        try{
            var result=await actionDataprocessor.getDetail(id)
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
        var responseData=new ResponseData()
        try{
            var result=await actionDataprocessor.edit(id,request)
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
        var responseData=new ResponseData()
        try{
            var result=await actionDataprocessor.deleteAction(id)
            responseData.getSuccessResponseData(result)
            logger.info(`deleteAction -  ${JSON.stringify(result)}`)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
            error.info(`deleteAction -  ${JSON.stringify(e)}`)
        }
        return responseData
    }

}
module.exports=new actionService()


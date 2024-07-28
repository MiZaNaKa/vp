
class User{
    constructor(
        name='',
        description='',
        date=new Date(),
        createdID=""        
    ){
        this.name=name,
        this.description=description,
        this.date=date,
        this.createdID=createdID        
    }
    
}

module.exports=User


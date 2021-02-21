const jwt = require('jsonwebtoken')

module.exports = (req, res, next) =>{
      try{
            const token = req.headers.authorization.split(' ')
            const decodedToken = jwt.verify(token[1], "SECRET_KEY")
            const userId = decodedToken.userId
        
            if(req.body.userId && req.body.userId !== userId){
               throw  new Error("Echec de l'authentification") 
            }
            else{
                next()
            }
        }
        catch(err) {
                throw err
            }
}
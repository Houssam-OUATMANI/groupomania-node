const multer = require('multer')
const { v4: uuidv4 } = require('uuid')

const mimeTypes = {
      "image/png" : "png",
      "image/jpg" : "jpg",
      "image/jpeg" : "jpeg",
      "image/gif" : "gif",
  }

  //  traitement des fichiers images
const fileStore = multer.diskStorage({
      destination: (req , file , cb) => {
          cb(null, 'public/image')
      },
      filename: (req ,file , cb) => {
         // const imageName = file.originalname.split(' ').join('_').toLowerCase().split(`.${mimeTypes[file.mimetype]}`)[0]
          const imageExt = mimeTypes[file.mimetype]
          cb(null ,`${uuidv4()}.${imageExt}`)
      }
  })
  

 module.exports =  multer({ storage  : fileStore }).single("image")
export const fileFilter = ( req: Express.Request,file: Express.Multer.File,callback: Function) => {

    //console.log(file);

    if(!file) return callback(new Error('file is empty') , false);
    
    const fileExtension = file.mimetype.split('/')[1]

    const validExtension = ['jpg','jepg','png','gif']

    if(validExtension.includes(fileExtension)){
        return callback(null,true)
    }
    

    callback(null,false)
};

const libs = {};
const cloudinary = require('cloudinary');

libs.upload_img = async (file, chat)=>{
    const result = await cloudinary.v2.uploader.upload(file.path,{
        public_id:`${chat}-img-${file.filename}`,
        folder:`apolo/${chat}`,
        async: false,
        eager:{
            width:800,
            height:800,
            quality:90,
            format:'png'
        },
        eager_async: true
    });
    return result;
}
libs.upload_vid = async (file, chat)=>{
    const result = await cloudinary.v2.uploader.upload(file.path,{
        public_id:`${chat}-vid-${file.filename}`,
        folder:`apolo/${chat}`,
        async: false,
        resource_type: 'video',
        chunk_size:20000,
        eager:{
            width:800,
            height:800,
            quality:90
        },
        eager_async: true
    });
    return result;
}

module.exports = libs;
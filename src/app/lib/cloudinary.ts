
import { v2 as cloudinary } from 'cloudinary';


// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (file: Blob): Promise<string | null> => {
    if (!file) {
        return null
    }
    try {
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        return new Promise((resolve, rejects)=>{
            const uplodeStream= cloudinary.uploader.upload_stream(
                {resource_type:"auto"},
                (error,result)=>{
                    if(error){
                        rejects(error)
                    }else{
                        resolve(result?.secure_url ?? null)
                    }
                }
            )
            uplodeStream.end(buffer)
        })

    } catch (error) {
        console.log(error)
        return null
    }
}


export default uploadOnCloudinary ;


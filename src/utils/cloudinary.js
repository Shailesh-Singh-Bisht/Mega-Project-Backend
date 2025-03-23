import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }
    //upload file

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    //file has been uploaded succesfully
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the local saved temp file as the upload is failed on cloudinary
  }
};

const deleteCloudinary = async (id) => {
  try {
    if (!id) {
      return null;
    }
    const response = await cloudinary.uploader.destroy(id);
    return response;  // Return the response to check deletion status
  } catch (error) {
    console.error('Error deleting file from Cloudinary:', error);
    return null;  // Return null to indicate failure
  }
};


export { uploadOnCloudinary,deleteCloudinary };

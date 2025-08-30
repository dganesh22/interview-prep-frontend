import { API_PATHS} from "./apiPath.js";
import axiosInstance from "./axiosInstance.js";

const uploadImage = async (profileImage) => {
    const formData = new FormData();
    // append image file
    formData.append("image", profileImage);

    try {
    const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE,formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
        return response?.data
    } catch (err) {
        console.error(err);
        throw err;
    }
}


export  default  uploadImage
import axios from "axios";

export const uploadImage = async (image: any) => {
  const formData = new FormData();
  formData.append("image", image);
  const imageUrl = await axios({
    method: "post",
    url: "https://api.imgbb.com/1/upload?key=d8c45604255f9ba9f58b7abac6165496",
    data: formData,
  });

  return imageUrl.data;
};

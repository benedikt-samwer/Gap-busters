import axios from "axios";
import { BACKEND_URL } from "@/consts/urls";

export const ping = async () => {
  return axios.get(BACKEND_URL + "/ping");
};

export const pingPost = async (selectedFile) => {
  const formData = new FormData();
  formData.append("file", selectedFile);

  return axios.post(BACKEND_URL + "/ping", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

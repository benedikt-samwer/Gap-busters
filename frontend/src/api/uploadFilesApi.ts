import axios from "axios";
import { BACKEND_URL } from "@/consts/urls";

export const uploadPdf = async (selectedFile, projectId) => {
  const formData = new FormData();
  formData.append("file", selectedFile);

  return axios.post(BACKEND_URL + "/upload/pdf/" + projectId, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const uploadAudio = async (selectedFile, projectId) => {
  const formData = new FormData();
  formData.append("file", selectedFile);

  return axios.post(BACKEND_URL + "/upload/audio/" + projectId, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const uploadMemo = async (blob, projectId) => {
  const formData = new FormData();
  formData.append("file", blob);

  return axios.post(BACKEND_URL + "/upload/memo/" + projectId, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const uploadImage = async (selectedFile, projectId) => {
  const formData = new FormData();
  formData.append("file", selectedFile);

  return axios.post(BACKEND_URL + "/upload/image/" + projectId, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const uploadImage64 = async (selectedFile, projectId) => {
  return axios.post(
    BACKEND_URL + "/upload/image64/" + projectId,
    { base64: selectedFile },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const uploadText = async (text, projectId) => {
  console.log(text);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post(
    BACKEND_URL + "/upload/text/" + projectId,
    { text: text },
    config
  );
};

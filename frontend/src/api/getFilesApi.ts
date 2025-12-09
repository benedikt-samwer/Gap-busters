import axios from "axios";
import { BACKEND_URL } from "@/consts/urls";

export const getOverviewReport = async (projectID) => {
  const response = await axios.post(BACKEND_URL + "/report/" + projectID);
  console.log(response.data);
  return response.data.url;
};

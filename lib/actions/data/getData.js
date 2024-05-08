import {serverApi} from "@/lib/config/axios";
import Cookies from "js-cookie";

export const fetchWithToken = async (url) => {
  const token = Cookies.get("__qcc_session") || "";
  const response = await serverApi.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

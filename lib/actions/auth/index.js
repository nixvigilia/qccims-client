import {serverApi} from "@/lib/config/axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export async function signIn({formData, setIsLoading}) {
  try {
    setIsLoading(true);

    const response = await serverApi.post("/api/user/login", formData);
    const {message, token} = response.data;

    if (response.status === 200) {
      toast.success(message);
      Cookies.set("__qcc_session", token, {
        sameSite: "Strict",
        secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
        expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      });

      return true;
    } else {
      setIsLoading(false);
    }
  } catch (error) {
    if (
      error.response &&
      [401, 403, 409, 500].includes(error.response.status)
    ) {
      toast.error(error.response.data.message);
    }
    setIsLoading(false);
  }
}

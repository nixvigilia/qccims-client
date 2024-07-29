import {serverApi} from "@/lib/config/axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export async function postRequest(
  setLoading,
  endpoint,
  data,
  resourceName,
  reset
) {
  try {
    setLoading(true);
    const token = Cookies.get("__qcc_session") || "";
    const response = await serverApi.post(endpoint, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      setLoading(false);
      toast.success(`New ${resourceName} Created Successfully`);
      reset();
      return response;
    } else {
      setLoading(false);
      toast.error("Something went wrong");
    }
  } catch (error) {
    setLoading(false);
    toast.error("Something went wrong");
  }
}

export async function updateRequest(
  setLoading,
  endpoint,
  data,
  resourceName,
  reset
) {
  try {
    setLoading(true);
    const token = Cookies.get("__qcc_session") || "";
    const response = await serverApi.put(endpoint, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      setLoading(false);
      toast.success(`${resourceName} Updated Successfully`);
    } else {
      setLoading(false);
      toast.error("Something went wrong");
    }
  } catch (error) {
    setLoading(false);
    toast.error("Something went wrong");
  }
}

export async function deleteRequest(setLoading, endpoint) {
  try {
    setLoading(true);
    const token = Cookies.get("__qcc_session") || "";
    const response = await serverApi.delete(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      setLoading(false);
      toast.success(`Deleted Successfully`);
      return response;
    } else {
      setLoading(false);
      toast.error("Something went wrong");
    }
  } catch (error) {
    setLoading(false);
    toast.error("Something went wrong");
  }
}

"use client";

import {createContext, useReducer, useContext, useEffect} from "react";
import Cookies from "js-cookie";
import {serverApi} from "@/lib/config/axios";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import useSWR from "swr";

export const Store = createContext();

const initialState = {
  token: Cookies.get("__qcc_session") || "",
  user: {
    isLoggedIn: false,
    isVerified: false,
    email: "",
    firstName: "",
    lastName: "",
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "INITIALIZE_USER_DATA":
      return {
        ...state,
        user: action.payload,
      };
    case "USER_LOGOUT":
      return initialState;
    default:
      return state;
  }
}

const fetcher = (url, token) =>
  serverApi
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

export function StoreProvider({children}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const authCookie = Cookies.get("__qcc_session");

  const {data, error} = useSWR(["/api/user/info", authCookie], ([url, token]) =>
    fetcher(url, token)
  );

  useEffect(() => {
    if (data && data.user) {
      dispatch({
        type: "INITIALIZE_USER_DATA",
        payload: {
          isLoggedIn: true,
          ...data.user,
        },
      });
    } else if (error) {
      if (error && error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          toast.error(error.response.data.message);
          Cookies.remove("__qcc_session");
          // router.push("/login");
        } else {
          toast.error("An error occurred while fetching user data.");
        }
      }
    }
  }, [data, error]);

  useEffect(() => {
    if (!authCookie) {
      router.push("/login");
    }
  }, [authCookie]);

  const value = {state, dispatch};
  return <Store.Provider value={value}>{children}</Store.Provider>;
}

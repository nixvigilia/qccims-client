"use client";

import {createContext, useReducer, useEffect, useState} from "react";
import Cookies from "js-cookie";
import {serverApi} from "@/lib/config/axios";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";

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
    case "INITIALIZE_USER_DATA": {
      const {isLoggedIn, email, firstName, lastName, isVerified} =
        action.payload;
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn,
          email,
          firstName,
          lastName,
          isVerified,
        },
      };
    }
    case "USER_LOGOUT":
      return initialState;
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const authCookie = Cookies.get("__qcc_session");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!authCookie) {
        handleNoAuthCookie();
        return;
      }

      try {
        const {data: user, status} = await serverApi.get("/api/user/info", {
          headers: {Authorization: `Bearer ${authCookie}`},
        });

        if (status === 200) {
          dispatch({
            type: "INITIALIZE_USER_DATA",
            payload: {
              isLoggedIn: true,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              isVerified: user.isVerified,
            },
          });
        }
      } catch (error) {
        handleRequestError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [authCookie]);

  const handleNoAuthCookie = () => {
    router.push("/login");
    setLoading(false);
  };

  const handleRequestError = (error) => {
    console.error("Request failed with error:", error);
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      toast.error(error.response.data.message);
      Cookies.remove("__qcc_session");
      router.push("/login");
    }
    setLoading(false);
  };

  if (loading) {
    return null;
  }

  if (!state.user.isLoggedIn) {
    return null;
  }

  const value = {state, dispatch};
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}

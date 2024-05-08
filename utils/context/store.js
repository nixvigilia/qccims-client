"use client";

import {createContext, useReducer, useEffect} from "react";
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
    case "USER_LOGOUT": {
      return {
        initialState,
      };
    }

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const authCookie = Cookies.get("__qcc_session");

  const fetchUserData = async () => {
    if (!authCookie) {
      handleNoAuthCookie();
      return;
    }

    const headers = {
      Authorization: `Bearer ${authCookie}`,
    };

    try {
      const userResponse = await serverApi.get("/api/user/info", {headers});
      if (userResponse.status === 200) {
        const {user} = userResponse.data;

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
      } else {
        handleErrorResponse(userResponse);
      }
    } catch (error) {
      handleRequestError(error);
      return;
    }
  };

  const handleErrorResponse = (response) => {
    if (response.status === 401 || response.status === 403) {
      toast.error(response.data.message);
      Cookies.remove("__qcc_session");
      router.push("/login");
    } else {
      toast.error(response.data.message);
    }
  };

  const handleNoAuthCookie = () => {
    router.push("/login");
  };

  const handleRequestError = (error) => {
    // Cookies.remove("__qcc_session");
    // router.push("/login");
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const value = {state, dispatch};
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}

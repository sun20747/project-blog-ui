/* eslint-disable react-hooks/rules-of-hooks */
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import useSWR from "swr";
import { setUser, resetAll } from "../store/session";
import url from "@/fetch.config";

export default function useCurruntUser() {
  const token = useSelector((state) => state.session.token);
  const currenUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const fetcher = async (...args) => {
    if (args.length <= 1) {
      args.push({});
    }
    const options = args[1];
    if (!options.headers) {
      options.headers = {};
    }
    options.headers["Content-Type"] = "application/json";
    const response = await fetch(...args);
    const json = response.json();
    // console.log(json.then((re)=>re));
    return json;
  };

  const fetcherWithToken = async (...args) => {
    if (args.length <= 1) {
      args.push({});
    }
    const options = args[1];
    if (!options.headers) {
      options.headers = {};
    }
    options.headers["auth-token"] = `Bearer ${token}`;
    return await fetcher(...args);
  };

  const logout = async () => {
    const response = await fetcherWithToken(`${url}/api/v1/user/sign_out`, {
      method: "DELETE",
    });
    dispatch(resetAll());
    // window.location = "/login";
  };

  const options = {
    refreshInterval: 3000,
    // revalidateOnFocus: true,
  };

  const { data: userData } = useSWR(
    token ? `${url}/api/v1/user/me` : null,
    fetcherWithToken,
    options
  );

  useEffect(() => {
    if (userData) {
      userData.success
        ? dispatch(setUser(userData.user))
        : dispatch(resetAll());
    }
  }, [userData]);

  return {
    token,
    currenUser,
    fetcher,
    fetcherWithToken,
    logout,
  };
}

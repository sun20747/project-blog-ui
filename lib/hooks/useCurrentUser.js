/* eslint-disable react-hooks/rules-of-hooks */
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import useSWR from "swr";
import { setUser, resetAll } from "../store/session";

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
    options.headers["content-type"] = "application/json";
    const response = await fetch(...args)
    const json = response.json();
    
    return json

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
    const url = "http://127.0.0.1:3000/api/v1/user/sign_out";
    const response = await fetcherWithToken(url, { method: "DELETE" });
    dispatch(resetAll());
    // window.location = "/login";
  };
  
  const { data: userData } = useSWR(
    token ? 
    "http://127.0.0.1:3000/api/v1/user/me" : null,
    fetcherWithToken
  );

  useEffect(() => {
    if (userData) {
      // dispatch(setUser(userData.user))
      // console.log(userData.success);
      // const {success} = userData
      // console.log(userData.success ? "y" : "n");
      userData.success ? dispatch(setUser(userData.user)) : dispatch(resetAll())
    }

  }, [userData]);

  return { token, currenUser, fetcher, fetcherWithToken, logout };
}

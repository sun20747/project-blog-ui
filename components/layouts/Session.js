import React from "react";
import SessionTopbar from "./reusable/SessionTopbar";
import styles from "./Session.module.css";
import useCurruntUser from "@/lib/hooks/useCurrentUser";
import { setToken } from "@/lib/store/session";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Root from "./Root";
import router from "next/router";

export default function Default({ children }) {
  const { token, currenUser } = useCurruntUser();
  const dispatch = useDispatch();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    dispatch(setToken(jwt));
  }, []);


  // useEffect(()=>{
  //   if(token && token.length > 0){
  //     console.log('Token',token);
  //   }
  // },[token])

  //  useEffect(()=>{
  //   if(currenUser){
  //     console.log('currenUser',currenUser);
  //   }
  // },[currenUser])

  return (
    <Root>
      <SessionTopbar></SessionTopbar>
      <div className={styles.container}>{children}</div>
    </Root>
  );
}

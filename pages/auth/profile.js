import React, { useEffect, useState } from "react";
import SessionLayout from "@/components/layouts/Session";
import { useSelector } from "react-redux";
import useCurruntUser from "@/lib/hooks/useCurrentUser";
import router from "next/router";
import { Container, CssBaseline, Grid } from "@mui/material";
import Cradprofile from "./cardprofile";
import Myblogs from "../../components/body/myblogs";
import Newpost from "./newpost";

export default function Profile() {
  let [blogs, setBlogs] = useState();
  const token = useSelector((state) => state.session.token);
  const { currenUser, fetcherWithToken } = useCurruntUser();

  // useEffect(()=>{
  //   setBlogs(currenUser?.user_blogs);
  // })
  // useEffect(()=>{
  // },[blogs])
  // .sort((a,b)=> new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  return (
    <SessionLayout>
      <CssBaseline />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} lg={12}>
            <Cradprofile />
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <Newpost data={currenUser} />
          </Grid>
        </Grid>
        <Grid container sx={{ marginTop: 1 }} spacing={2}>
          {currenUser?.user_blogs.map((blog) => (
            <Myblogs {...blog} key={blog.id}></Myblogs>
          ))}
        </Grid>
      </Container>
    </SessionLayout>
  );
}

import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/layouts/Default";
import SessionLayout from "@/components/layouts/Session";
import axios from "@/axios.config";
import { Grid } from "@mui/material";
import BlogItem from "./blogItem";
import useCurrentUser from "@/lib/hooks/useCurrentUser";

export default function Index() {
  const { currenUser } = useCurrentUser();
  const [blogs, setBlogs] = useState([]);
  const getData = async () => {
    const { data } = await axios.get(`/api/v1/blog/blogs`);
    setBlogs(data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {currenUser ? (
        <SessionLayout>
          {blogs ? (
            <Grid container spacing={2}>
              {blogs.map((blog) => (
                <BlogItem {...blog} key={blog.id}></BlogItem>
              ))}
            </Grid>
          ) : (
            <div>null</div>
          )}
        </SessionLayout>
      ) : (
        <DefaultLayout>
          {blogs ? (
            <Grid container spacing={2}>
              {blogs.map((blog) => (
                <BlogItem {...blog} key={blog.id}></BlogItem>
              ))}
            </Grid>
          ) : (
            <div>null</div>
          )}
        </DefaultLayout>
      )}
    </>
  );
}

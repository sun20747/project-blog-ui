import React, { useEffect, useState } from "react";
import SessionLayout from "@/components/layouts/Session";
import { useSelector } from "react-redux";
import useCurruntUser from "@/lib/hooks/useCurrentUser";
import router from "next/router";
import { Container, CssBaseline, Grid } from "@mui/material";
import Cradprofile from './cradprofile'

export default function Profile() {
  const token = useSelector((state) => state.session.token);
  const { currenUser, fetcherWithToken } = useCurruntUser();

  useEffect(() => {
    
    if (!localStorage.getItem("jwt")) {
      router.push(`/login`, undefined, { shallow: true });
    }
  }, [currenUser, token]);

  return (
    <SessionLayout>
      <CssBaseline />
      <Container>
        <Grid container spacing={2}>
        <Grid item  xs={12} sm={6} lg={6} >
        <Cradprofile />
        </Grid>
        <Grid item>
          dadada
        </Grid>
      </Grid>
      </Container>
      
    </SessionLayout>
  );
}

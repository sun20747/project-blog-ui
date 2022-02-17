import React, { useEffect, useState } from "react";
import LayoutAdmin from "./LayoutAdmin";
import useCurruntAdmin from "@/lib/hooks/useCurrentAdmin";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const { fetcherWithToken } = useCurruntAdmin();
  useEffect(() => {
    fetcherWithToken("http://node-js.thddns.net:4661/api/v1/admin/dashboard", {
      method: "GET",
    })
      .then((json) => {
        // console.log(json);
        setData(json);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <LayoutAdmin>
      <>
        <Container maxWidth="xl">
          <Box sx={{ pb: 5 }}>
            <Typography variant="h4">Hi, Welcome back</Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sx={{ marginBottom: 4 }}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Orders data={data} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </>
    </LayoutAdmin>
  );
}

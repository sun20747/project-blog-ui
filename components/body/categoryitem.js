import React from "react";
import { useDispatch } from "react-redux";

import { Grid, Chip } from "@mui/material";
import { setCategory } from "@/lib/store/session";

export default function CategoryItem({ title, Icon }) {
  const dispatch = useDispatch();
  const filterProducts = () => {
    dispatch(setCategory(title));
  };

  return (
    <Grid item onClick={filterProducts}>
      <Chip icon={<Icon />} label={title} clickable color="primary"></Chip>
    </Grid>
  );
}

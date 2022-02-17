import React from "react";

import { Grid } from "@mui/material";
import {
  Headset,
  Watch,
  CameraAlt,
  Nature,
  Computer,
  Book,
  InvertColors,
  Visibility,
  Code,
  CloudQueue,
} from "@mui/icons-material";

import { styled } from "@mui/material/styles";

import CategoryItem from "../components/body/categoryitem";

const CATEGORIES = [
  {
    title: "Code",
    Icon: Code,
  },
  {
    title: "Linux",
    Icon: Nature,
  },
  {
    title: "Computer",
    Icon: Computer,
  },
  {
    title: "Network",
    Icon: CloudQueue,
  },
];

const MyGrid = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export default function CategoryList() {
  return (
    <MyGrid container justifyContent="center" spacing={2}>
      {CATEGORIES.map((category) => (
        <CategoryItem key={category.title} {...category}></CategoryItem>
      ))}
    </MyGrid>
  );
}

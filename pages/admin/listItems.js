import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BookIcon from "@mui/icons-material/Book";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import Link from "next/link";


export const mainListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Admin
    </ListSubheader>
    <Link passHref={true} href="/admin/board">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>

    <Link passHref={true} href="/admin/user">
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>
    </Link>

    <Link passHref={true} href="/admin/thread">
      <ListItemButton>
        <ListItemIcon>
          <BookIcon />
        </ListItemIcon>
        <ListItemText primary="Thread" />
      </ListItemButton>
    </Link>

    <Link passHref={true} href="/admin/userwaitingconfirmed">
      <ListItemButton>
        <ListItemIcon>
          <HourglassTopIcon />
        </ListItemIcon>
        <ListItemText primary="Waiting confirmed" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

// export const secondaryListItems = (
//   <React.Fragment>
    
//   </React.Fragment>
// );

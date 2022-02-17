import React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import date from "@/module/data";

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders({ data }) {
  // console.log(data);
  return (
    <React.Fragment>
      <Title>Data count</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Thread(C)</TableCell>
            <TableCell>Users(C)</TableCell>
            <TableCell>UsersWaiting(C)</TableCell>
            <TableCell>Admins(C)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableCell>{date(Date.now())}</TableCell>
          <TableCell>{data?.blogs}</TableCell>
          <TableCell>{data?.users}</TableCell>
          <TableCell>{data?.userswaiting}</TableCell>
          <TableCell>{data?.admins}</TableCell>
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        {/* See more orders */}
      </Link>
    </React.Fragment>
  );
}

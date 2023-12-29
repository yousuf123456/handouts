"use client";

import React from "react";
import Currency from "react-currency-formatter";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { FormattedCurrency } from "@/app/components/FormattedCurrency";

const StyledTableCell: any = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "transparent",
    fontFamily: "var(--font-poppins)",
  },
  [`&.${tableCellClasses.body}`]: {
    fontFamily: "var(--font-poppins)",
    fontSize: 14,
  },
}));

interface TotalTableProps {
  productsAmmount: number;
  paddingLeft?: number;
  subTotal: number;
  labels: string[];
}

export default function TotalTable({
  subTotal,
  productsAmmount,
  paddingLeft,
  labels,
}: TotalTableProps) {
  const lessDestractiveClassName = {
    fontSize: 12,
    fontWeight: 500,
    paddingLeft: paddingLeft,
    color: "#cbd5e1",
  };
  const moreDestractiveClassName = {
    fontSize: 16,
    fontWeight: 600,
    color: "#4ade80",
  };

  const lessDestractiveClassName2 = {
    fontWeight: 500,
    color: "white",
    paddingLeft: paddingLeft,
  };
  const moreDestractiveClassName2 = { fontWeight: 600, color: "#4ade80" };

  return (
    <Table size="small" sx={{ minWidth: 360 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <StyledTableCell sx={lessDestractiveClassName}>
            {labels[0] + "(" + productsAmmount + " items)"}
          </StyledTableCell>
          <StyledTableCell sx={lessDestractiveClassName} align="left">
            {labels[1]}
          </StyledTableCell>
          <StyledTableCell sx={moreDestractiveClassName} align="left">
            {labels[2]}
          </StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <StyledTableCell sx={lessDestractiveClassName2}>
            <FormattedCurrency quantity={subTotal} />
          </StyledTableCell>
          <StyledTableCell sx={lessDestractiveClassName2}>
            <FormattedCurrency quantity={150} />
          </StyledTableCell>
          <StyledTableCell sx={moreDestractiveClassName2}>
            <FormattedCurrency quantity={subTotal + 150} />
          </StyledTableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

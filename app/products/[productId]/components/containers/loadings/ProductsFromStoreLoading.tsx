"use client";
import { Heading } from "@/app/(site)/components/Heading";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import React from "react";
import { Container } from "../../Container";

export const ProductsFromStoreLoading = () => {
  return (
    <div className="h-full flex-shrink-0 max-lg:w-full">
      <Container className="w-full lg:w-fit ">
        <div className="flex flex-col gap-4 lg:items-center">
          <Heading>From the Same Store</Heading>

          <div className="max-lg:w-full lg:hidden">
            <LinearProgress color="secondary" />
          </div>
          <div className="hidden lg:block">
            <CircularProgress color="secondary" />
          </div>
        </div>
      </Container>
    </div>
  );
};

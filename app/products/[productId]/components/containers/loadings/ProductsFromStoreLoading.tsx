"use client";
import { Heading } from "@/app/(site)/components/Heading";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import { Container } from "../../Container";
import { LinearProgress, useMediaQuery } from "@mui/material";

export const ProductsFromStoreLoading = () => {
  const isLargeDevices = useMediaQuery("(max-width:1024px)");

  return (
    <div className="h-full flex-shrink-0 max-lg:w-full">
      <Container wFit={!isLargeDevices}>
        <div className="flex flex-col gap-4 lg:items-center">
          <Heading>From the Same Store</Heading>

          {isLargeDevices ? (
            <LinearProgress color="secondary" />
          ) : (
            <CircularProgress color="secondary" />
          )}
        </div>
      </Container>
    </div>
  );
};

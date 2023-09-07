"use client";

import React from "react";

import { HiChevronRight } from "react-icons/hi";
import { Breadcrumbs, Link, Typography, useMediaQuery } from "@mui/material";

interface BreadCrumbs {
  crumbs: {
    label: string;
    href: string;
  }[];
}

export const BreadCrumbs: React.FC<BreadCrumbs> = ({ crumbs }) => {
  const color = "#2998FF";

  const isMediumDevices = useMediaQuery("(max-width:768px)");
  const fontSize = isMediumDevices ? 14 : 16;

  return (
    <div className="flex items-center gap-1">
      <Breadcrumbs separator={<HiChevronRight />}>
        {crumbs.map((crumb, i) => (
          <div key={i}>
            {i !== crumbs.length - 1 ? (
              <Link
                sx={{ fontSize: fontSize }}
                underline="hover"
                fontFamily={"var(--font-poppins)"}
                color={color}
                href={crumb.href}
              >
                {crumb.label}
              </Link>
            ) : (
              <Typography
                sx={{ fontSize: fontSize }}
                color="text.primary"
                fontFamily={"var(--font-poppins)"}
              >
                {crumb.label}
              </Typography>
            )}
          </div>
        ))}
      </Breadcrumbs>
    </div>
  );
};

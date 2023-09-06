"use client";
import { useMediaQuery } from "@mui/material";
import {
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LineIcon,
  LineShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "next-share";
import React from "react";

interface ShareLinksProps {
  url: string;
  quote?: string;
}

export const ShareLinks: React.FC<ShareLinksProps> = ({ url, quote }) => {
  const isSmallDevices = useMediaQuery("(max-width:640px)");
  const size = isSmallDevices ? 40 : 50;
  return (
    <>
      <WhatsappShareButton url={url}>
        <WhatsappIcon size={size} round />
      </WhatsappShareButton>

      <LineShareButton url={url}>
        <LineIcon size={size} round />
      </LineShareButton>

      <FacebookMessengerShareButton url={url} appId={""}>
        <FacebookMessengerIcon size={size} round />
      </FacebookMessengerShareButton>

      <TelegramShareButton url={url}>
        <TelegramIcon size={size} round />
      </TelegramShareButton>

      <ViberShareButton url={url}>
        <ViberIcon size={size} round />
      </ViberShareButton>

      <FacebookShareButton url={url} quote={quote}>
        <FacebookIcon size={size} round />
      </FacebookShareButton>

      <TwitterShareButton url={url}>
        <TwitterIcon size={size} round />
      </TwitterShareButton>
    </>
  );
};

import React from "react";
import { PortionWrapper } from "./PortionWrapper";
import {
  RiArrowGoBackFill,
  RiCashLine,
  RiShieldCheckLine,
} from "react-icons/ri";

import { FaShieldAlt } from "react-icons/fa";
import { ServiceCard } from "./ServiceCard";

export const Services = () => {
  return (
    <PortionWrapper portionName="Services">
      <div className="flex flex-col gap-3 rounded-md border-[1px] p-3">
        <ServiceCard
          className="text-pink-500"
          Icon={RiArrowGoBackFill}
          label="7 Days Return"
        />

        <ServiceCard
          className="text-themeBlue"
          Icon={RiShieldCheckLine}
          label="1 year warranty"
        />

        <ServiceCard
          className="text-green-500"
          Icon={RiCashLine}
          label="cash on delievery"
        />
      </div>
    </PortionWrapper>
  );
};

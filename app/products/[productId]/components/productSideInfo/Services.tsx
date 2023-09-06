import React from "react";
import { PortionWrapper } from "./PortionWrapper";
import {
  RiArrowGoBackFill,
  RiArrowTurnBackFill,
  RiCashLine,
  RiShieldCheckLine,
} from "react-icons/ri";

import { FaShieldAlt } from "react-icons/fa";
import { ServiceCard } from "./ServiceCard";
import { SectionHeading } from "../SectionHeading";
import { Section } from "../containers/Section";

export const Services = () => {
  return (
    <div className="w-full">
      <PortionWrapper portionName="Services" className="hidden lg:block">
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

      <div className="lg:hidden">
        <Section mode="full" variant="differentiate">
          <div className="flex max-md:justify-between md:gap-36">
            <SectionHeading>Services</SectionHeading>

            <div className="flex flex-col gap-3">
              <ServiceCard
                className="text-themeSecondary"
                Icon={RiArrowGoBackFill}
                label="7 Days Return"
              />

              <ServiceCard
                className="text-themeSecondary"
                Icon={RiShieldCheckLine}
                label="1 year warranty"
              />

              <ServiceCard
                className="text-themeSecondary"
                Icon={RiCashLine}
                label="cash on delievery"
              />
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};

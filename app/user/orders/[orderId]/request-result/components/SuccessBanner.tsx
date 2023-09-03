import React from "react";
import { FaCheckCircle } from "react-icons/fa";

interface SuccessBannerProps {
  type: "Cancellation" | "Return";
  process: "pending" | "completed";
}

export const SuccessBanner: React.FC<SuccessBannerProps> = ({
  type,
  process,
}) => {
  return (
    <div className="flex w-full justify-center">
      <div className="flex items-center gap-4 rounded-sm bg-green-500 p-4 xl:p-6">
        <FaCheckCircle className=" h-5 w-5 flex-shrink-0 text-white sm:h-6 sm:w-6 lg:h-8 lg:w-8" />

        <h1 className="text-base font-semibold text-white max-sm:text-center sm:text-lg lg:text-xl">
          {process === "completed"
            ? "Your request to cancel order was successfull"
            : "Your request has been submitted. We will let you know about the " +
              (type === "Cancellation" ? "cancellation" : "return") +
              " updates"}
        </h1>
      </div>
    </div>
  );
};

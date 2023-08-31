import React from "react";

import { getUserCancellationRequests } from "@/app/actions/getUserCancellationRequests";
import { EmptyState } from "../../components/EmptyState";
import { FaTimes } from "react-icons/fa";
import { Order_OrderRequestCard } from "../../orders/components/Order_OrderRequestCard";
import { CancellationRequestType } from "@/app/types";
import { Heading } from "@/app/(site)/components/Heading";
import { PaginationControl } from "../../components/PaginationControl";
import { CANCELLATIONS_PER_PAGE } from "@/app/constants/consts";
import { NavigationPanel } from "@/app/components/NavigationPanel";

interface CancellationsProps {
  pageNumber: number | undefined;
}

export const Cancellations: React.FC<CancellationsProps> = async ({
  pageNumber,
}) => {
  const { data, count } = (await getUserCancellationRequests({
    page: pageNumber,
  })) as unknown as { data: CancellationRequestType[]; count: number };

  if (!data) {
    return <EmptyState Icon={FaTimes} label="There are no cancellations yet" />;
  }

  return (
    <div className="flex flex-col gap-6">
      <NavigationPanel heading="My Cancellations" />

      <Heading className="hidden sm:block">
        My Cancellations {"(" + count + ")"}
      </Heading>

      <div className="flex flex-col gap-0">
        {data.map((cancellationRequest, i) => (
          <Order_OrderRequestCard
            key={i}
            request={cancellationRequest as CancellationRequestType}
            orderRequestType="Cancellations"
            isOrderRequest={true}
          />
        ))}
      </div>

      <PaginationControl
        count={count}
        offset={true}
        ITEMS_PER_PAGE={CANCELLATIONS_PER_PAGE}
      />
    </div>
  );
};

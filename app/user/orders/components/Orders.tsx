import React from "react";

import { Heading } from "@/app/(site)/components/Heading";
import { getUserOrders } from "@/app/actions/getUserOrders";
import { OrdersList } from "./OrdersList";
import { PaginationControl } from "../../components/PaginationControl";
import { ORDERS_PER_PAGE } from "@/app/constants/consts";

interface OrdersProps {
  pageNumber: number | undefined;
}

export async function Orders({ pageNumber }: OrdersProps) {
  const { orders, count } = await getUserOrders({ page: pageNumber });

  return (
    <div className="flex h-full w-full flex-col gap-6">
      <Heading className="hidden sm:block">
        {"My Orders " + "(" + count + ")"}
      </Heading>

      <OrdersList orders={orders} />

      <PaginationControl
        count={count}
        offset={true}
        ITEMS_PER_PAGE={ORDERS_PER_PAGE}
      />
    </div>
  );
}

import prisma from "../libs/prismadb";

import { ORDERS_PER_PAGE } from "../constants/consts";
import { OrderType } from "../types";
import { getCurrentUser } from "./getCurrentUser";

interface getPaginationQueryParameters {
  query: any;
  ITEMS_PER_PAGE: number;
  jumpingDisabled?: boolean;
  page?: number | undefined;
  cursor?: string | undefined;
  prevPage?: number | undefined;
}

export const getPaginationQuery = (
  parameters: getPaginationQueryParameters = { query: {}, ITEMS_PER_PAGE: 1 },
) => {
  const { page, query, cursor, prevPage, ITEMS_PER_PAGE, jumpingDisabled } =
    parameters;

  const goingToSomePage = page !== undefined && prevPage !== undefined;

  const goingBack = goingToSomePage && page < prevPage;
  const goingNext = goingToSomePage && page > prevPage;

  const jumpingToSomePage =
    goingToSomePage && (page - prevPage > 1 || page - prevPage < -1);

  if (goingToSomePage && goingBack && !jumpingToSomePage)
    query.orderBy = {
      id: "asc",
    };

  if (goingToSomePage && !jumpingToSomePage)
    query.where = {
      ...query.where,
      id: {
        ...(goingNext ? { lt: cursor } : { gt: cursor }),
      },
    };

  if (goingToSomePage && jumpingToSomePage)
    query.skip = (page - 1) * ITEMS_PER_PAGE;

  return {
    updatedQuery: query,
    goingBack: goingBack,
  };
};

interface getOffsetPaginationQueryParams {
  query: any;
  page?: number;
  ITEMS_PER_PAGE: number;
}

export const getOffsetPaginationQuery = ({
  page,
  query,
  ITEMS_PER_PAGE,
}: getOffsetPaginationQueryParams) => {
  const itemsToSkip = ((page || 1) - 1) * ITEMS_PER_PAGE;

  query.skip = itemsToSkip;

  return query;
};

interface Parameters {
  page?: number | undefined;
}

export const getUserOrders = async (parameters: Parameters = {}) => {
  const currentUser = await getCurrentUser();
  if (!currentUser || !currentUser.id)
    return {
      orders: null,
      count: 0,
    };

  const { page } = parameters;

  let query: any = {
    orderBy: {
      id: "desc",
    },

    where: {
      customerId: currentUser.id,
    },

    include: {
      packages: {
        include: {
          orderedProducts: true,
        },
      },
    },

    take: ORDERS_PER_PAGE,
  };

  const updatedQuery = getOffsetPaginationQuery({
    query,
    page: page as number,
    ITEMS_PER_PAGE: ORDERS_PER_PAGE,
  });

  const userOrders = await prisma.$transaction([
    prisma.order.count({ where: { customerId: currentUser.id } }),
    prisma.order.findMany(updatedQuery),
  ]);

  const userOrdersCount = userOrders[0] ?? 0;
  const userOrdersData = userOrders[1] as OrderType[];

  return {
    count: userOrdersCount,
    orders: userOrdersData,
  };
};
